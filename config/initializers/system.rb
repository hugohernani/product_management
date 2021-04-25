Dry::Rails.container do
  register(:products_repository, memoize: true){ ApplicationRepository.new(gateway: Product) }

  config.features = %i[
    controller_helpers
    safe_params
  ]

  config.finalize! if Rails.env.production?
end
