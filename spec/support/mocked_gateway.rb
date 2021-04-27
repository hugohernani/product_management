class MockedGateway
  extend ActiveRecord::FinderMethods
  include ActiveModel::Model

  def self.primary_key
    'id'
  end

  attr_accessor :id, :name
end
