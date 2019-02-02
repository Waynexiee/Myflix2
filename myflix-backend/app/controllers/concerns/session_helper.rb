module SessionHelper
  def logged_in?
    !current_user.nil?
  end

  def current_user
    return nil unless redis.get(request.headers[:Authorization]).nil?
    @current_user = User.find(Authorization.new(request).current_user)
  end

  def log_out(token)
    @current_user = nil
    redis.expire(token, 120*3600)
  end

  def require_user
    json_response({ error: 'Not Authorized' }, 401) unless current_user
  end

  def is_existed?(video_id)
    current_user.queue_items.map(&:video_id).include?(video_id)
  end

  def redis
    @redis ||= Redis.new
  end
end