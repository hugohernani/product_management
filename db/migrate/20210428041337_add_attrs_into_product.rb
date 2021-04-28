class AddAttrsIntoProduct < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :description, :string
    add_column :products, :filename,    :string
    add_column :products, :height,      :integer
    add_column :products, :width,       :integer
  end
end
