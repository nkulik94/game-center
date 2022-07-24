class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description
end
