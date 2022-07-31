class UserListSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :tier, :avatar_url, :full_name, :like_count, :rate_count, :review_count

  def full_name
    "#{self.object.first_name} #{self.object.last_name}"
  end

  def like_count
    self.object.likes.count
  end

  def rate_count
    self.object.ratings.count
  end

  def review_count
    self.object.reviews.count
  end
end
