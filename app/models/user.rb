class User < ApplicationRecord
    has_many :likes
    has_many :liked_games, through: :likes, source: :game
    has_many :ratings
    has_many :rated_games, through: :ratings, source: :game
    has_many :reviews
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
end
