source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.3', '>= 6.1.3.1'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.5'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
# gem 'rack-cors'

gem 'dry-rails', '~> 0.3.0'
gem 'factory_bot_rails', '~> 6.1'
gem 'faker', '~> 2.17'
gem 'responders', '~> 3.0'
gem 'resque', '~> 2.0'

group :development, :test do
  gem 'dotenv-rails', '2.7.6'

  gem 'rubocop-rails', '2.9.1'
  gem 'rubocop-rspec', '2.2.0'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  gem 'foreman', '~> 0.87.2'
  gem 'guard-rspec', '4.7.3'
  gem 'listen', '~> 3.3'
  gem 'rubocop', '1.12.0'
  gem 'spring', '2.1.1'
end

group :test do
  gem 'rspec-rails', '~> 5.0'
  gem 'shoulda-matchers', '~> 4.5'
  gem 'simplecov', '~> 0.21.2'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
