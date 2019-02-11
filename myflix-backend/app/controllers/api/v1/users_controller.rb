module Api::V1
  class UsersController < ApplicationController
    before_action :require_user ,only: [:show]

    def create
      @user = User.new(user_param)
      if @user.valid?
        @user.save
        # AppMailer.delay.send_welcome_email(@user)
        json_response @user, :created
      else
        json_response({errors: @user.errors.full_messages}, 422)
      end
    end

    def show
      @user = User.find(params[:id])
      json_response(@user.attributes.merge(all_reviews: @user.all_reviews,
                                           can_follow: current_user.can_follow?(@user),
                                           avatar: @user.avatar,
                                           all_queue_items: @user.updated_queue_items))
    end

    private

    def user_param
      params.permit(:email, :name, :password)
    end
  end
end
