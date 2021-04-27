Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/docs'
  mount Rswag::Api::Engine => '/docs'

  root to: 'home#index'
  get '/', to: 'home#index', defaults: { format: :json }

  scope module: :v1, as: :v1 do
    resources :products, defaults: {format: :json} do
      post 'batch', to: 'products/batch#create', on: :collection
    end
  end

  scope path: 'auth' do
    post 'signup', to: 'accounts#create'
    post 'login', to: 'authentication#create'
  end
end
