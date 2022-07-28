class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :user_id, :content, :rating, :user_full_name, :user_username

  def rating
    self.object.rating.rating
  end

  def user_full_name
    "#{self.object.user.first_name} #{self.object.user.last_name}"
  end

  def user_username
    self.object.user.username
  end
end
