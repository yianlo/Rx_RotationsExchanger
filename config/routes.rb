Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    get 'session/check', :to => 'sessions#check'
    get 'rooms/filter', :to => 'rooms#filter'

    resources :rooms, only: [:index, :create, :show, :update, :destroy]

    resources :images, only: [:create, :destroy]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy]

    resources :users do
      resources :rooms, only: [:index]
    end
  end
end
