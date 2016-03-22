Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    get 'session/check', :to => 'sessions#check'
    get 'rooms/filter', :to => 'rooms#filter'
    get 'bookings/approve', :to => 'bookings#approve'
    get 'bookings/deny', :to => 'bookings#deny'


    resources :rooms, only: [:index, :create, :show, :update, :destroy]

    resources :bookings, only: [:create, :destroy]
    resources :images, only: [:create, :destroy]
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :destroy]

    resources :users do
      resources :rooms, only: [:index]
      resources :bookings, only: [:index]
      get 'hostings', :to => 'bookings#hostings'
      get 'past_trips', :to => 'bookings#past_trips'
    end
  end
end
