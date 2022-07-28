class AddRatingIdToReviews < ActiveRecord::Migration[6.1]
  def change
    add_column :reviews, :rating_id, :integer
  end
end
