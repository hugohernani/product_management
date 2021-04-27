require 'rails_helper'

class MockBaseRepo
  extend ActiveRepository::ArErrorClasses
end

describe ActiveRepository::ArErrorClasses do
  it 'includes a subclass of ActiveRecord::RecordNotFound of the class with ArErrorClasses extended' do
    expect(MockBaseRepo.const_get('RecordNotFound').superclass).to eq ActiveRecord::RecordNotFound
  end

  it 'includes all ActiveRecord error classes' do
    ar_error_classes = ActiveRecord::ActiveRecordError.subclasses
    ar_error_classes.each do |ar_class|
      expect do
        MockBaseRepo.const_get(ar_class.name)
      end.not_to raise_error
    end
  end
end
