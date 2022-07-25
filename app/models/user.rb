class User < ApplicationRecord
    has_many :user_games
    has_many :games, through: :user_games
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
end
