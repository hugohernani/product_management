[
  {
    title: 'Brown eggs', type: 'dairy', description: 'Raw organic brown eggs in a basket',
    filename: '0.jpg', height: 600, width: 400, price: 28.1, rating: 4
  },
  {
    title: 'Green smoothie', type: 'dairy', description: "Glass of green smoothie with quail egg's yolk",
    filename: '3.jpg', height: 600, width: 399, price: 17.68, rating: 4
  }
].each do |attrs|
  Product.create!(attrs)
end
