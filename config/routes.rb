Rails.application.routes.draw do
  namespace :api do
  get 'bookings/create'
  end

  namespace :api do
  get 'bookings/destroy'
  end

  namespace :api do
  get 'bookings/show'
  end

  namespace :api do
  get 'bookings/update'
  end

  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    get 'session/check', :to => 'sessions#check'
    get 'rooms/filter', :to => 'rooms#filter'

    resources :rooms, only: [:index, :create, :show, :update, :destroy]

    resources :users do
      resources :rooms, only: [:index]
    end

    resources :images, only: [:create, :destroy]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy]
  end
end
