class MessagesController < ApplicationController
  def index
    render json: Message.order(created_at: :desc)
  end

  def create
    client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )

    sms = client.messages.create(
      from: ENV['TWILIO_PHONE_NUMBER'],
      to: params.require(:to),
      body: params.require(:body)
    )
    message = Message.new(from: sms.from, to: sms.to, body: sms.body, direction: "outbound")

    if message.save
      render json: { sid: sms.sid }, status: :created
    else
      render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
    end
  end
end