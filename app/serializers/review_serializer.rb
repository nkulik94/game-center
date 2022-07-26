class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :content
end
