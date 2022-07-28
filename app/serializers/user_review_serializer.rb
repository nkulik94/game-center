class UserReviewSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :content, :game

  def game
    self.object.game.title
  end
end
