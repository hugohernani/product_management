Dry::Rails.container do
  register(:products_repository, memoize: true){ ApplicationRepository.new(gateway: Product) }
  register(:users_repository, memoize: true){ ApplicationRepository.new(gateway: Product) }
  namespace('use_cases') do
    register('authorization', memoize: true){ Authorization.new }
  end

  config.features = %i[
    controller_helpers
    safe_params
  ]

  config.finalize! if Rails.env.production?
end
