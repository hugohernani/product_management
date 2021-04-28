RSpec.shared_context 'api request with generated response' do |version_media_type|
  after do |example|
    example.metadata[:response][:content] = {
      version_media_type => {
        example: JSON.parse(response.body, symbolize_names: true)
      }
    }
  end

  run_test!
end
