module JobTransactionAdapter
  def perform_jobs_inline
    around do |example|
      perform_enqueued_jobs do
        example.run
      end
    end
  end
end
