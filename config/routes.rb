Rails.application.routes.draw do
  resources :users
  resources :signups
  resources :volunteers
  resources :activities

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/volunteer/:id", to: "volunteers#user"
  post "/create/", to: "users#create_both"
  patch "/update/:id", to: "volunteers#update"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
