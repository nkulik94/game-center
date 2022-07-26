class DetailedGameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :description, :game_url, :genre, :platform, :publisher, :developer, :release_date, :likes

  def likes
    self.object.likes.count
  end
end
