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
      can_follow = (@user != current_user && current_user.friendships.map(&:friend_ship).include?(@user.id))
      json_response(@user.attributes.merge(all_reviews: @user.reviews,
                                           can_follow: can_follow,
                                           avatar: @user.avatar,
                                           all_queue_items: @user.updated_queue_items))
    end

    private

    def user_param
      params.permit(:email, :name, :password)
    end
  end
end
