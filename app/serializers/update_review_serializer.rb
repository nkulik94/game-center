class UpdateReviewSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :content, :game, :rating, :thumbnail, :user_full_name, :user_username, :user_avatar

  def game
    self.object.game.title
  end

  def rating
    self.object.rating.rating
  end

  def thumbnail
    self.object.game.thumbnail
  end

  def user_full_name
    "#{self.object.user.first_name} #{self.object.user.last_name}"
  end

  def user_username
    self.object.user.username
  end

  def user_avatar
    self.object.user.avatar_url
  end
end
