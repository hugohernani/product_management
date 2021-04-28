class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :type, :rating, :price, :created_at

  def type
    object.category
  end
end
