class AddDescriptionAndFtgIdToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :description, :text
    add_column :games, :ftg_id, :integer
  end
end
