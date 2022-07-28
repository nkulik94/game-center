class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description, :likes, :rating, :review_count

  def likes
    self.object.likes.count
  end

  def review_count
    self.object.reviews.count
  end
end
