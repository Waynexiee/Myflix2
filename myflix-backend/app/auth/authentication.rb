class Authentication
  attr_reader :user
  def initialize(user_object)
    @password = user_object[:password]
    @user = User.find_by(email: user_object[:email])
  end

  def authenticate
    @user && @user.authenticate(@password)
  end

  def generate_token
    JsonWebToken.encode(user_id: @user.id, name: @user.name)
  end
end