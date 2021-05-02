require "resque_web"

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/docs'
  mount Rswag::Api::Engine => '/docs'

  mount ResqueWeb::Engine => "/resque_web"

  root to: 'home#index'
  get '/', to: 'home#index', defaults: { format: :json }

  scope module: :v1, as: :v1, constraints: ApiVersion.new('v1', default: true) do
    resources :products, defaults: {format: :json} do
      post 'batch', to: 'products/batch#create', on: :collection
    end
  end

  scope path: 'auth' do
    post 'signup', to: 'accounts#create'
    post 'login', to: 'authentication#create'
  end
end
