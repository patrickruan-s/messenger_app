# Twilio Messenger

Rails 8 + Angular messaging app using Twilio.

## Setup
- Backend: Rails API
- Frontend: Angular SPA

## Run locally

Create a .env file in my_messenger_backend/:
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
DEVISE_JWT_SECRET_KEY=any_long_random_string

In Seperate Terminals:
cd my_messenger_backend
bundle install && rails s

cd my_messenger_ui
npm install && npm start

ngrok http 3000

Navigate to localhost:4200

Set the ngrok URL + /webhooks/twilio/sms as your Twilio phone
number's webhook in the Twilio console.

## Production
Angular is built and served from Rails `/public`


Dependencies:

Backend: Rails, Mongoid, Devise, Twilio Ruby, Rack CORS, Phonelib,     
  Dotenv, Puma, Solid Cache, Solid Queue, Solid Cable, Pry.

Frontend: Angular 21, Angular SSR, Angular Router, Angular Forms,      
  Express, RxJS, Bootstrap 5, TypeScript, Vitest, Prettier.  
  Frontend:
