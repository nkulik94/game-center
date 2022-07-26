class LikeSerializer < ActiveModel::Serializer
  attributes :id
  has_many :games
end
