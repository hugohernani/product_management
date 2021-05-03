# Ruby on Rails Challenge 20200810

### Project Dependencies

* Ruby 3.0.0
* Rails 6.1.3
* Bundler 2.2.15
* Postgresql 12
* Redis 5.0

## Project setup on local machine

* `$ Clone this project`
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

* To access the resources one should first sign in with existing dev account credentials (check seeds) or create one account by clicking on Sign Up button and submitting the form

### TODO

* Dockerize apps
* Separate even further domain and architecture implementation on server side
* Improve testing on client side
* Add channel (websocket) features to easy client navigation, specifially when uploading bulk of products
