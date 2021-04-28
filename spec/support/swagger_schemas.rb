class SwaggerSchemas
  def self.generate
    {
      product: product_schema,
      new_product: new_product_schema,
      new_products_batch: new_products_batch,
      batch_upload: batch_upload_schema,
      general_error: general_error,
      errors_object: errors_object,
      errors_map: errors_map
    }
  end

  def self.product_schema
    {
      type: :object,
      properties: {
        title: { type: :string },
        category: { type: :string },
        rating: { type: :integer, format: :int32 },
        price: { type: :string }
      }
    }
  end

  def self.new_product_schema
    {
      type: :object,
      properties: {
        product: {
          '$ref': '#/components/schemas/product',
          required: %w[title category price]
        }
      }
    }
  end

  def self.new_products_batch
    {
      type: :object,
      properties: {
        file: { type: :string, format: :base64 }
      }
    }
  end

  def self.batch_upload_schema
    {
      type: :object,
      properties: {
        account_id: { type: :integer, format: :int32 },
        status: { type: :string },
        upload_type: { type: :string },
        created_at: { type: :datetime },
        updated_at: { type: :datetime }
      }
    }
  end

  def self.general_error
    {
      type: :object,
      required: %w[status message],
      properties: {
        status: { type: :integer, format: :int32 },
        message: { type: :string }
      }
    }
  end

  def self.errors_object
    {
      type: 'object',
      properties: {
        errors: {
          '$ref': '#/components/schemas/errors_map'
        }
      }
    }
  end

  def self.errors_map
    {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: { type: 'string' }
      }
    }
  end
end
