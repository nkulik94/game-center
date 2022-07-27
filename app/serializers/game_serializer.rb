class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description, :likes, :average_rating

  def likes
    self.object.likes.count
  end

  def average_rating
    if self.object.ratings.count > 0
      average = self.object.ratings.average(:rating)
      average.round(1)
    end
  end
end
