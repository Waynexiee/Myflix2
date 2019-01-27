class JsonWebToken
  class << self
    JWT_SECRET = ENV["JWT_SECRET"] || "secret"
    def encode(payload, exp = 2.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, JWT_SECRET)
    end

    def decode(token)
      body = JWT.decode(token, JWT_SECRET)[0]
      HashWithIndifferentAccess.new body
    rescue
      # we don't need to trow errors, just return nil if JWT is invalid or expired
      nil
    end
  end
end