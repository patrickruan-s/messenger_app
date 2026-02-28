Rails.application.routes.draw do
  resources :messages, only: [:create, :index]
  post "/webhooks/twilio/sms", to: "webhooks/twilio#sms"
end
