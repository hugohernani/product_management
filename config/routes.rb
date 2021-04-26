Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/docs'
  mount Rswag::Api::Engine => '/docs'
  scope module: :v1, as: :v1 do
    resources :products, defaults: {format: :json}
  end
end
