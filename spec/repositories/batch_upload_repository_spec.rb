require 'rails_helper'

describe BatchUploadRepository do
  subject(:batch_upload_repo){ described_class.new(gateway: gateway) }

  let(:gateway){ MockedGateway }
  let(:batch_upload){ instance_double('BatchUpload', id: 42, processing!: nil, finished!: nil) }

  before do
    allow(gateway).to receive(:find).and_return(batch_upload)
  end

  describe '#start_processing' do
    it 'calls for processing on returned batch upload instance' do
      batch_upload_repo.start_processing(batch_upload.id)

      expect(batch_upload).to have_received(:processing!)
    end

    it 'calls for finished! on returned batch upload instance' do
      batch_upload_repo.finish_processing(batch_upload.id)

      expect(batch_upload).to have_received(:finished!)
    end
  end
end
