class Authorization
  def initialize(request)
    @token = request.headers[:Authorization]
  end

  def current_user
    JsonWebToken.decode(@token)[:user_id] if @token && JsonWebToken.decode(@token)
  end
end
