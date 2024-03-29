Rails.application.config.after_initialize do

  Rswag::Ui.configure do |config|
    # List the Swagger endpoints that you want to be documented through the swagger-ui
    # The first parameter is the path (absolute or relative to the UI host) to the corresponding
    # endpoint and the second is a title that will be displayed in the document selector
    # NOTE: If you're using rspec-api to expose Swagger files (under swagger_root) as JSON or YAML endpoints,
    # then the list below should correspond to the relative paths for those endpoints

    config.swagger_endpoint '/docs/v1/products.yaml', 'Product Management API V1 Documentation'

    # Add Basic Auth in case your API is private
    config.basic_auth_enabled = true
    config.basic_auth_credentials ENV['default_email'] || 'admin@localhost.com', ENV['default_password'] || '12341234'
  end
end
