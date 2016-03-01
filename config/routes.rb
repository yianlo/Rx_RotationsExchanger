Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :rooms, only: [:index, :create, :show, :update, :destroy]
    resources :images, only: [:create, :update]
    resources :users, only: [:new, :create, :show, :update]
    resource :session, only: [:new, :create, :destroy]

    get 'session/check', :to => 'sessions#check'
  end
end
