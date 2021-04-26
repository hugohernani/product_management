class SwaggerSchemas
  def self.generate
    {
      product: product_schema,
      new_product: new_product_schema,
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
