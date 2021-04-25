module V1
  class ProductsController < ApplicationController
    def index
      products = products_repository.all
      respond_with :v1, products
    end

    def show
      respond_with :v1, product
    end

    def create
      product = products_repository.build(product_params)

      products_repository.save(product)
      respond_with :v1, product
    end

    def update
      products_repository.update(product, product_params)
      respond_with :v1, product
    end

    def destroy
      products_repository.destroy(product)
      respond_with :v1, product
    end

    private

    def product
      @product ||= products_repository.find(params[:id])
    end

    def product_params
      params.require(:product).permit(:title, :category, :rating, :price)
    end

    def products_repository
      resolve('products_repository')
    end
  end
end
