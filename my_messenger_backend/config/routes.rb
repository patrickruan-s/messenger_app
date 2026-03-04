Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  resources :messages, only: [:create, :index]
  post "/webhooks/twilio/sms", to: "webhooks/twilio#sms"
end
