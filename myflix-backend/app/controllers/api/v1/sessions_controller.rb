module Api::V1
  class SessionsController < ApplicationController
    def create
      auth_object = Authentication.new(session_params)
      if auth_object.authenticate
        json_response({token: auth_object.generate_token})
      else
        json_response({errors: 'Incorrect username/password combination'}, :unauthorized)
      end
    end

    def destroy
      log_out
      json_response nil, :success
    end

    private

    def session_params
      params.require(:session).permit(:email, :password)
    end
  end
end
