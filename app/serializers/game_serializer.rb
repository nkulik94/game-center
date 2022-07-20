class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description, :game_url, :genre, :platform, :publisher, :developer, :release_date
end
