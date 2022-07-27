class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :bio, :tier, :avatar_url, :full_name

  def full_name
    "#{self.object.first_name} #{self.object.last_name}"
  end

  has_many :liked_games
  has_many :ratings
end
