class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :title
      t.text :description
      t.string :smaller_cover_url
      t.string :larger_cover_url
      t.integer :category_id
      t.string :video_url
      t.string :large_picture

      t.timestamps
    end
  end
end
