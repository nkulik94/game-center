class RatingSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :rating

  belongs_to :game
end
