class User < ApplicationRecord
    has_many :likes
    has_many :games, through: :likes
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
end
