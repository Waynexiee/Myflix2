module Api::V1
  class Admin::VideosController < ApplicationController
    before_action :require_user
    before_action :require_admin

    def get_category
      @category = Category.all
      json_response @category
    end

    def create
      @video = Video.new(video_params)
      if @video.save
        json_response "You have successfully added the video"
      else
        json_response "Add video failed!", 403
      end
    end

    private

    def require_admin
      if !current_user.admin?
        json_response "You are not allowed to do this.", 403
      end
    end

    def video_params
      params.require(:video).permit(:category_id, :title, :description, :video_url, :larger_cover_url, :smaller_cover_url)
    end
  end
end