module Api::V1
  class FriendshipsController < ApplicationController
    before_action :require_user
    def index
      @followings = current_user.friendships || []
      updated_followings = @followings.map do |following|
        user = User.find(following.friend_id)
        following.attributes.merge(friend_name: user.name,
                                   friend_queue_item_count: user.queue_items.count,
                                   friend_follower_count: Friendship.count("friend_id = #{user.id}"),
                                   friend_avatar: user.avatar)
      end
      json_response(updated_followings)
    end

    def create
      @friendship = Friendship.new(user: current_user, friend_id: params[:friend_id])
      if current_user.can_follow?(User.find(params[:friend_id])) && @friendship.save
        json_response("Follow successfully!")
      else
        @followings = current_user.friendships || []
        json_response("Follow failed!", 403)
      end
    end

    def destroy
      if Friendship.exists?(id: params[:id], user_id: current_user.id)
        Friendship.find_by(id: params[:id], user_id: current_user.id).delete
      end
      @followings = current_user.friendships || []
      updated_followings = @followings.map do |following|
        user = User.find(following.friend_id)
        following.attributes.merge(friend_name: user.name, friend_queue_item_count: user.queue_items.count, friend_follower_count: Friendship.count(:conditions => "friend_id = #{user.id}"))
      end
      json_response(updated_followings)
    end
  end
end
