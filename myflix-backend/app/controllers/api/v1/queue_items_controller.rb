module Api::V1
  class QueueItemsController < ApplicationController
    before_action :require_user

    def index
      @queue_items = current_user.queue_items || []
      updated_queue_items = @queue_items.map do |queue_item|
        queue_item.attributes.merge('score' => queue_item.video_score, 'video_url' => queue_item.video_url, 'video_title' => queue_item.video_title, 'video_category' => queue_item.video_category)
      end
      json_response updated_queue_items
    end

    def create
      @item = queue_add(params[:video_id].to_i)
      @video = Video.find(params[:video_id])
      if not_duplicated?(@item) && @item.save
        @reviews = @video.reviews.map do |review|
          review.attributes.merge(writen_by: review.user.name)
        end
        json_response @video.attributes.merge({'reviews' => @reviews, 'is_in_queue' => is_existed?(@video.id), 'average_score' => @video.average_score})
      else
        json_response("Add failed!", 404)
      end
    end

    def destroy
      if QueueItem.find(params[:id]).user_id != current_user.id
        @queue_items = current_user.queue_items || []
        json_response("You are not allowed!", 403)
      else
        QueueItem.find_by(params[:order]).delete
        current_user.queue_nomalize
        @queue_items = current_user.queue_items || []
        updated_queue_items = @queue_items.map do |queue_item|
          queue_item.attributes.merge('score' => queue_item.video_score, 'video_url' => queue_item.video_url, 'video_title' => queue_item.video_title, 'video_category' => queue_item.video_category)
        end
        json_response updated_queue_items
      end
    end

    def update_queue
      begin
        update_rating
        queue_reorder
        current_user.queue_nomalize
      rescue ActiveRecord::RecordInvalid
        puts "Invalid input!"
      end
      @queue_items = current_user.queue_items || []
      updated_queue_items = @queue_items.map do |queue_item|
        queue_item.attributes.merge('score' => queue_item.video_score, 'video_url' => queue_item.video_url, 'video_title' => queue_item.video_title, 'video_category' => queue_item.video_category)
      end
      json_response updated_queue_items
    end

    private

    def next_id
      QueueItem.count + 1
    end

    def not_duplicated?(item)
      !current_user.queue_items.map(&:video).include?(item.video)
    end

    def queue_add(id)
      QueueItem.new(order: next_id, video_id: id, user: current_user )
    end

    def queue_create(id)
      QueueItem.create(order: next_id, video_id: id, user: current_user )
    end

    def queue_reorder
      ActiveRecord::Base.transaction do
        params[:queue_items].each do |queue_item|
          item = QueueItem.find(queue_item["id"])
          item.update_attributes!(order: queue_item["order"]) if item.user == current_user
        end
      end
    end

    def update_rating
      params[:queue_items].each do |queue_item|
        item = QueueItem.find(queue_item["id"])
        reviews = item.user.reviews.where(video_id: item.video.id)
        reviews.each do |review|
          review.update_attributes!(score: queue_item["score"]) if item.user == current_user
        end
      end
    end
  end
end
