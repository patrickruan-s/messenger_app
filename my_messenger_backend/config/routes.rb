Rails.application.routes.draw do
  devise_for :users
  resources :messages, only: [:create, :index]
  post "/webhooks/twilio/sms", to: "webhooks/twilio#sms"
end
