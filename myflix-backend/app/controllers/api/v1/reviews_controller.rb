module Api::V1
  class ReviewsController < ApplicationController
    before_action :require_user ,only: [:create]
    def create
      @video = Video.find(params[:video_id])
      @review = @video.reviews.build(review_params)
      if @review.save
        @reviews = @video.reviews.map do |review|
          review.attributes.merge(writen_by: review.user.name)
        end
        json_response @video.attributes.merge({'reviews' => @reviews, "is_in_queue" => is_existed?(@video.id)})
      else
        json_response("invalid rate.", 403)
      end
    end

    private

    def review_params
      reviewParams = {}
      reviewParams[:user_id] = current_user.id
      reviewParams[:score] = params[:score].to_i
      reviewParams[:content] = params[:content]
      reviewParams
    end
  end
end
