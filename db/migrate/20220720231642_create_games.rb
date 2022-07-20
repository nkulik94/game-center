class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :thumbnail
      t.string :short_description
      t.string :game_url
      t.string :genre
      t.string :platform
      t.string :publisher
      t.string :developer
      t.string :release_date

      t.timestamps
    end
  end
end
