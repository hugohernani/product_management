Dry::Rails.container do
  register(:products_repository){ ApplicationRepository.new(gateway: Product) }

  config.finalize! if Rails.env.production?
end
