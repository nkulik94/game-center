class CreateUserGames < ActiveRecord::Migration[6.1]
  def change
    create_table :user_games do |t|
      t.integer :user_id
      t.integer :game_id
      t.boolean :liked
      t.string :review
      t.integer :rating

      t.timestamps
    end
  end
end
