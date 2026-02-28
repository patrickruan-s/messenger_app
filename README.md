# Twilio Messenger

Rails 8 + Angular messaging app using Twilio.

## Setup
- Backend: Rails API
- Frontend: Angular SPA

## Run locally
In Seperate Terminals:
cd my_messenger_backend
bundle install && rails s

cd my_messenger_ui
npm install && npm start

npx localtunnel --port 3000 --subdomain my-messenger-app

Navigate to localhost:4200

## Production
Angular is built and served from Rails `/public`
