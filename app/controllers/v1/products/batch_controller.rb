module V1
  module Products
    class Products::BatchController < ApplicationController
      def create
        # TODO: Delegate file handling to an use case
      end

      private
      def product_batch_params
        params.permit(:file)
      end
    end
  end
end
