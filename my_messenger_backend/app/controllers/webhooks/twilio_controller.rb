class Webhooks::TwilioController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

  def sms
    user = Message.where(to: params[:From], direction: "outbound").first&.user || User.last
    unless user
      Rails.logger.error "Inbound SMS from #{params[:From]} ignored: no user found"
      return head :ok
    end

    message = user.messages.create(
      from: params[:From],
      to: params[:To],
      body: params[:Body],
      direction: "inbound"
    )

    Rails.logger.error "Inbound message failed: #{message.errors.full_messages}" unless message.persisted?

    head :ok
  end
end