class DetailedGameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :description, :game_url, :genre, :platform, :publisher, :developer, :release_date, :likes, :rating

  def likes
    self.object.likes.count
  end

  def rating
    if self.object.ratings.count > 0
      average = self.object.ratings.average(:rating)
      average.round(1)
    end
  end
end
