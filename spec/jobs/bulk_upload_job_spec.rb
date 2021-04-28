require 'rails_helper'

RSpec.describe BulkUploadJob, type: :job do
  let(:bulk_upload_instance){ instance_double('bulk upload', handle_batch: nil) }
  let(:bulk_upload_klass){ class_double('Bulk Upload', new: bulk_upload_instance) }
  let(:resource_repository_name){ 'products_repository' }
  let(:job_args){ [42, 'content', resource_repository_name] }

  before(:all) do
    stub_container
    container_mock(:products_repository, double)
  end

  after(:all) do
    container_unmock(:products_repository)
  end

  before do
    stub_const('BulkUpload', bulk_upload_klass)
  end

  it 'delegates file handling to BulkUpload' do
    described_class.perform_now(*job_args)

    expect(bulk_upload_instance).to have_received(:handle_batch)
  end

  it 'enqueues job with provided args' do
    expect do
      described_class.perform_later(*job_args)
    end.to have_enqueued_job(described_class).with(*job_args)
  end

  it 'enqueues job on default queue' do
    expect do
      described_class.perform_later(*job_args)
    end.to have_enqueued_job.on_queue('default')
  end
end
