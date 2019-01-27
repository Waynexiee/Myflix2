module SessionHelper
  def logged_in?
    !current_user.nil?
  end

  def current_user
    @current_user = User.find(Authorization.new(request).current_user)
  end

  def log_out
    @current_user = nil
  end

  def require_user
    json_response({ error: 'Not Authorized' }, 401) unless current_user
  end

  def is_existed?(video_id)
    current_user.queue_items.map(&:video_id).include?(video_id)
  end
end