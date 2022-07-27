class AddRatingToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :rating, :decimal
  end
end
