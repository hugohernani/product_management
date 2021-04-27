Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/docs'
  mount Rswag::Api::Engine => '/docs'
  scope module: :v1, as: :v1 do
    resources :products, defaults: {format: :json}
  end

  scope path: 'auth' do
    post 'signup', to: 'accounts#create'
    post 'login', to: 'authentication#create'
  end
end
