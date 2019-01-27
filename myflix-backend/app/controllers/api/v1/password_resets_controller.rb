module Api::V1
  class PasswordResetsController < ApplicationController
    before_action :get_user,   only: [:edit, :update]
    before_action :valid_user, only: [:edit, :update]
    before_action :check_expiration, only: [:edit, :update]

    def create
      @user = User.find_by(email: params[:email])
      if @user
        @user.create_reset_digest
        @user.send_password_reset_email
        json_response "Email sent with password reset instructions"
      else
        json_response "Email address not found", 403
      end
    end

    def update
      if params[:password].empty?
        @user.errors.add(:password, "can't be empty")
        json_response "Password cannot be empty", 403
      elsif @user.update_attributes(user_params)
        @user.create_reset_digest
        auth_object = Authentication.new(user_params)
        if auth_object.authenticate
          session[:user_token] = true
          json_response({token: auth_object.generate_token, user: auth_object.user})
        else
          json_response({errors: 'Incorrect username/password combination'}, :unauthorized)
        end
      else
        json_response "Password's format is not right", 403
      end
    end

    private

    def valid_user
      unless (@user && @user.authenticated?(params[:id]))
        json_response "Not valid user", 403
      end
    end

    def get_user
      @user = User.find_by(email: params[:email])
    end

    def user_params
      params.permit(:password, :email, :id, :password_reset)
    end

    def check_expiration
      if @user.password_reset_expired?
        json_response "Password reset has expired.", 403
      end
    end
  end
end

