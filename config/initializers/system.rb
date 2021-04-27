Dry::Rails.container do
  register(:products_repository, memoize: true){ ApplicationRepository.new(gateway: Product) }
  register(:accounts_repository, memoize: true){ ApplicationRepository.new(gateway: Account) }
  register(:batch_upload_repository, memoize: true){ BatchUploadRepository.new(gateway: BatchUpload) }

  namespace('use_cases') do
    register('authorization', memoize: true){ Authorization.new }
    register('authentication', memoize: true){ Authentication.new }
  end

  config.features = %i[
    controller_helpers
  ]

  config.finalize! if Rails.env.production?
end
