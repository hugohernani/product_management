class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :title
      t.string :category
      t.integer :rating
      t.decimal :price, precision: 7, scale: 2

      t.timestamps
    end
  end
end
