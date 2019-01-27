Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :videos, only: [:show, :index] do
        collection do
          get '/search/:search', to: 'videos#search'
          get :advanced_search, to: 'videos#advanced_search'
        end
        resources :reviews, only: [:create]
      end

      post '/register', to: 'users#create'
      get '/users/:id', to: 'users#show'
      get '/sign_in', to: 'sessions#new'
      post '/sign_in', to: 'sessions#create'
      delete '/logout',  to: 'sessions#destroy'
      get '/my_queue', to: 'queue_items#index'
      post '/my_queue', to: 'queue_items#create'
      delete '/my_queue/:id', to: 'queue_items#destroy'
      post '/update_queue', to: 'queue_items#update_queue'
      get '/confirm_password_reset', to: 'pages#confirm_password_reset'
      get '/token_expired', to: 'pages#token_expired'
      get '/watch_video', to: 'watch_videos#watch'
      resources :password_resets,  only: [:new, :create, :edit, :update]
      resources :people, controller: :friendships
      namespace :admin do
        resources :videos
        get 'categories', to: 'videos#get_category'
      end
    end
  end
end
