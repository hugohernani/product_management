module V1
  module Products
    class Products::BatchController < ApplicationController
      def create
        bulk_upload = bulk_upload_service.enqueue_batch(
          processable_content: product_batch_params[:file],
          upload_type: 'json',
          account_id: current_account.id,
          repository_name: 'products_repository'
        )

        respond_with bulk_upload, location: v1_products_path
      end

      private

      def product_batch_params
        params.permit(:file)
      end

      def bulk_upload_service
        resolve('use_cases.bulk_upload')
      end
    end
  end
end
