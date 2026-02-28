class JwtDenylist
  include Mongoid::Document
  include Mongoid::Timestamps
  include Devise::JWT::RevocationStrategies::Denylist

  field :jti, type: String, default: ""
  field :exp, type: Time

  index({ jti: 1 }, { unique: true })
  index({ exp: 1 }, { expireAfterSeconds: 0 })
end
