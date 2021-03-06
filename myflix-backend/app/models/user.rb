class User < ApplicationRecord
  validates_presence_of :email, :name, :password
  validates_uniqueness_of :email
  has_secure_password
  has_many :reviews,->{ order(updated_at: :desc) }
  has_many :queue_items, -> { order(:order) }
  has_many :friendships
  has_many :friends, through: :friendships
  attr_accessor :reset_token
  def queue_nomalize
    queue_items.each_with_index do |queue_item, index|
      queue_item.update_attributes(order: index+1)
    end
  end

  def queued_video?(video)
    !!QueueItem.find_by(video_id: video.id)
  end

  def queue_item_count
    if queue_items.nil?
      return 0
    else
      return queue_items.count
    end
  end

  def reviews_count
    if reviews.nil?
      return 0
    else
      return reviews.count
    end
  end

  def all_reviews
    if reviews.nil?
      return []
    else
      reviews.map do |review|
        review.attributes.merge(video_name: review.video.title)
      end
    end
  end

  def all_queue_items
    if queue_items.nil?
      return []
    else
      return queue_items
    end
  end

  def not_include_friendship(friendship)
    return false if !friendships.nil? && friendships.map(&:friend_id).include?(friendship.friend_id)
    true
  end

  def can_follow?(follower)
    follower.id != id && !friendships.map(&:friend_id).include?(follower.id)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
    BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def avatar
    "http://www.gravatar.com/avatar/#{Digest::MD5.hexdigest(email.downcase)}?s=40"
  end

  def updated_queue_items
    queue_items.map do |queue_item|
      video = Video.find(queue_item.video_id)
      queue_item.attributes.merge(video_name: video.title,
                                  video_category: video.category.name)
    end
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_attribute(:reset_digest, User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.zone.now)
  end

  def send_password_reset_email
    AppMailer.password_reset(self, self.reset_token).deliver_now
  end

  def authenticated?(token)
    BCrypt::Password.new(self.reset_digest).is_password?(token)
  end

  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  def send_invitation_email(user)
    AppMailer.delay.send_invitation_email(user)
  end
end
