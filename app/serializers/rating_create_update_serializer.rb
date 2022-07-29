class RatingCreateUpdateSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :rating, :game_average

  def game_average
    self.object.game.rating
  end
end
