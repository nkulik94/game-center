class UserListSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :tier, :avatar_url, :full_name

  def full_name
    "#{self.object.first_name} #{self.object.last_name}"
  end
end
