class RatingCreateUpdateSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :rating
end
