class User < ApplicationRecord
    has_many :likes, dependent: :destroy
    has_many :liked_games, through: :likes, source: :game
    has_many :ratings, dependent: :destroy
    has_many :rated_games, through: :ratings, source: :game
    has_many :reviews, dependent: :destroy
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true

    def set_tier
        review_count = reviews.count
        tier = if review_count > 50
            'Hall of Fame'
        elsif review_count > 25
            'All-Pro'
        elsif review_count > 1
            'Pro'
        else
            'Rookie'
        end
        update(tier: tier)
    end

    def get_list list_name
        list = self.liked_games if list_name == 'likes'
        list = self.rated_games if list_name == 'ratings'
        list = self.reviews if list_name == 'reviews'
        list
    end
end
