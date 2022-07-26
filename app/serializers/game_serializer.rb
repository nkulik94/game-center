class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description, :likes

  def likes
    self.object.likes.count
  end
end
