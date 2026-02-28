class Message
  include Mongoid::Document
  include Mongoid::Timestamps

  validates :from, :to, :direction, presence: true
  validate :number_must_be_valid

  field :from, type: String
  field :to, type: String
  field :body, type: String
  field :direction, type: String # inbound | outbound

  index({ from: 1 })
  index({ to: 1 })

  def number_must_be_valid
    Phonelib.valid?(to)
  end
end