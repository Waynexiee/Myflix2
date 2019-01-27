module Api::V1
  class WatchVideosController < ApplicationController
    def watch
      @url = params[:url]
    end
  end
end
