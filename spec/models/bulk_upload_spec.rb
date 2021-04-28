require 'rails_helper'

describe BulkUpload do
  subject(:bulk_upload){ described_class.new }

  let(:resource_repository){ instance_double('products repository') }
  let(:batch_upload){ instance_double('batch upload', id: 42, upload_type: 'json') }
  let(:processable_content){ 'mocked_content' }
  let(:batch_repository){ di_container.resolve(:batch_upload_repository) }

  before(:all) do
    stub_container
    container_mock(:batch_upload_repository, MockedBatchUploadRepository.new)
  end

  after(:all) do
    container_unmock(:batch_upload_repository)
  end

  before do
    allow(batch_repository).to receive(:find).and_return(batch_upload)
  end

  describe '#enqueue_batch' do
    before do
      allow(BulkUploadJob).to receive(:perform_later)
    end

    it 'enqueues processing into BulkUploadJob' do
      bulk_upload.enqueue_batch(
        processable_content: processable_content, account_id: 42, resource_repository: resource_repository
      )
      expect(BulkUploadJob).to have_received(:perform_later)
        .with(batch_upload.id, processable_content, resource_repository)
    end

    it 'returns a batch_upload instance' do
      result = bulk_upload.enqueue_batch(
        processable_content: processable_content, account_id: 42, resource_repository: resource_repository
      )
      expect(result).to be_a(OpenStruct)
    end
  end

  describe '#handle_batch' do
    let(:json_upload_handler){ instance_double('json upload handler', process: nil) }

    before do
      allow(UploadHandlers::Factory).to receive(:upload_handler_for)
        .with(batch_upload.upload_type)
        .and_return(json_upload_handler)
    end

    it 'asks handlers factory to creates json handler' do
      bulk_upload.handle_batch(batch_upload.id, processable_content, resource_repository)
      expect(UploadHandlers::Factory).to have_received(:upload_handler_for).with(batch_upload.upload_type)
    end

    it 'delegates processing to upload handler' do
      bulk_upload.handle_batch(batch_upload.id, processable_content, resource_repository)
      expect(json_upload_handler).to have_received(:process)
    end
  end
end

class MockedBatchUploadRepository
  def create!(attrs = {})
    OpenStruct.new(id: attrs.fetch(:account_id, 42))
  end

  def find(id)
    OpenStruct.new(id: id)
  end
end
