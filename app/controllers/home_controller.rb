class HomeController < ApplicationController
  skip_before_action :authenticate_token!

  def index
    render json: 'Ruby on Rails Challenge 20200810'
  end
end
