class SwaggerSchemas
  def self.generate
    {
      product: product_schema,
      new_product: new_product_schema
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
end
