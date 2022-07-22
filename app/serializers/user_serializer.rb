class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :bio, :tier, :avatar_url
end
