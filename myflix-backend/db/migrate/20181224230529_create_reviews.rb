class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :score
      t.integer :video_id
      t.integer :user_id
      t.text :content

      t.timestamps
    end
  end
end
