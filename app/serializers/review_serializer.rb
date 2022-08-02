class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :user_full_name, :user_username, :user_avatar, :user_tier

  def rating
    self.object.rating.rating
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

  def user_tier
    self.object.user.tier
  end
end
