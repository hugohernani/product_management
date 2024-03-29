class SwaggerServerDefinition
  def initialize(env:)
    @host = env['HTTP_HOST']
    @schema = env['rack.url_scheme']
  end

  def call
    [
      {
        url: server_url
      }.deep_stringify_keys
    ]
  end

  private

  attr_reader :host, :schema

  def server_url
    URI("#{schema}://#{host}").to_s
  rescue URI::InvalidURIError, e
    'http://localhost:3000'
  end
end

Rails.application.config.after_initialize do

  Rswag::Api.configure do |config|
    config.swagger_root = Rails.root.join('swagger').to_s

    config.swagger_filter = lambda do |swagger, env|
      swagger['servers'] = SwaggerServerDefinition.new(env: env).call
    end
  end
end
