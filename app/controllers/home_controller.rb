class HomeController < ApplicationController
  skip_before_action :authenticate_token!

  def index
    render json: 'Product Management'
  end
end
