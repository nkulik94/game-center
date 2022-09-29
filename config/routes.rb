Rails.application.routes.draw do
  resources :ratings, except: [:index, :show]
  resources :reviews, except: [:index, :show]
  resources :games, only: [:index, :show, :update]
  
  post "/signup", to: "users#create"

  get "/me", to: "users#show"

  get "/me/:list", to: "users#list"

  get "/users", to: "users#index"

  post "/login", to: "sessions#create"

  delete "/logout", to: "sessions#destroy"

  patch "users/:id", to: "users#update"

  delete "users/:id", to: "users#destroy"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
