class CreateQueueItems < ActiveRecord::Migration[5.2]
  def change
    create_table :queue_items do |t|
      t.integer :user_id
      t.integer :order
      t.integer :video_id

      t.timestamps
    end
  end
end
