class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :content, :game, :rating, :thumbnail

  def game
    self.object.game.title
  end

  def rating
    self.object.rating.rating
  end

  def thumbnail
    self.object.game.thumbnail
  end
end
