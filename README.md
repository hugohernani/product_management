# Ruby on Rails Challenge 20200810

### Project Dependencies

* Ruby 3.0.0
* Rails 6.1.3
* Bundler 2.2.15
* Postgresql 12
* Redis 5.0

## Project setup on local machine

* `$ Close this project`
* `$ Enter the cloned project`
* `$ cp .env.sample .env`
* `Adjust env environment settings accordingly`

## Running the project

* `$ bundle exec rails s`

## On the web

* This project is also available on the [web](https://evening-crag-72102.herokuapp.com/). Go to: https://evening-crag-72102.herokuapp.com/
* There is an admin already to access the features
 * Go at this project path to check how it was created: `db/seeds/accounts.rb`

### Further details

* Right now the project is the admin user token to allow accessing its features.
* It's missing authentication routes on client side to allow user creation and then token retrieval
 * But authentication and authorization is fully covered on server side). It's currently bypassing a dynamic user retrieval to the demo. Check it here to understand: `app/controllers/application_controller.rb`

### TODO

* Dokerize apps
* Separate even further domain and architecture implementation on server side
* Create routes for authentication and authorization on client side
* Improve testing on client side
* Add channel (websocket) features to easy client navigation, specifially when uploading bulk of products
