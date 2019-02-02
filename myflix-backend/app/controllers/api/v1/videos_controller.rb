module Api::V1
  class VideosController < ApplicationController
    before_action :require_user, only: [:index, :show, :search]
    def index
      @categories = Category.all
      categories = {}
      @categories.each do |category|
        categories[category.name] = category.recent_videos
      end
      json_response(categories)
    end

    def show
      begin
        @video = Video.find(params[:id])
        @reviews = @video.reviews.map do |review|
          review.attributes.merge(writen_by: review.user.name)
        end
      rescue
        json_response({errors: "Cannot find video"}, 422)
        return
      end
      json_response @video.attributes.merge('reviews' => @reviews, 'is_in_queue' => is_existed?(@video.id), 'average_score' => @video.average_score)
    end

    def search
      @videos = Video.search_by_title(params[:search])
      json_response @videos
    end

    def advanced_search
      options = {
      reviews: params[:reviews],
      rating_from: params[:rating_from],
      rating_to: params[:rating_to]
      }

      if params[:query]
        @videos = Video.search(params[:query],options).records.to_a
      else
        @videos = []
      end
      json_response @videos
    end
  end
end
