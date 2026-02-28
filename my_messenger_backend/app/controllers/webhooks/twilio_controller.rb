class Webhooks::TwilioController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sms
    Message.create!(
      from: params[:From],
      to: params[:To],
      body: params[:Body],
      direction: "inbound"
    )

    head :ok
  end
end