class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :bio, :tier
end
