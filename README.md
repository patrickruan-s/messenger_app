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


Dependencies:

Backend:
  │           Gem           │                 Purpose                 │  
  ├─────────────────────────┼─────────────────────────────────────────┤  
  │ rails ~> 8.1.2          │ Web framework                           │  
  ├─────────────────────────┼─────────────────────────────────────────┤  
  │ mongoid                 │ MongoDB ORM                             │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ devise                  │ Authentication (registration, sessions) │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ twilio-ruby             │ Twilio SMS API client                   │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ rack-cors               │ Cross-origin requests (Angular → Rails) │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ phonelib                │ Phone number validation                 │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ dotenv-rails            │ Load .env secrets in dev/test           │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ puma                    │ Web server                              │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ solid_cache/queue/cable │ DB-backed caching, jobs, WebSockets     │
  │                         │ (Active Record)                         │
  ├─────────────────────────┼─────────────────────────────────────────┤
  │ pry                     │ Debugging REPL 


  Frontend:
    ┌───────────────────────┬──────────────────────────┐
  │        Package        │         Purpose          │
  ├───────────────────────┼──────────────────────────┤
  │ @angular/core + suite │ Angular 21 framework     │
  ├───────────────────────┼──────────────────────────┤
  │ @angular/ssr          │ Server-side rendering    │
  ├───────────────────────┼──────────────────────────┤
  │ @angular/router       │ Client-side routing      │
  ├───────────────────────┼──────────────────────────┤
  │ @angular/forms        │ Reactive forms           │
  ├───────────────────────┼──────────────────────────┤
  │ express               │ Node server for SSR      │
  ├───────────────────────┼──────────────────────────┤
  │ rxjs                  │ Observables / async HTTP │
  ├───────────────────────┼──────────────────────────┤
  │ bootstrap 5           │ UI styling               │
  ├───────────────────────┼──────────────────────────┤
  │ typescript ~5.9       │ Language                 │
  ├───────────────────────┼──────────────────────────┤
  │ vitest                │ Unit testing             │
  ├───────────────────────┼──────────────────────────┤
  │ prettier              │ Code formatting        
