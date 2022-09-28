class Game < ApplicationRecord
    has_many :likes
    has_many :liking_users, through: :likes, source: :user
    has_many :ratings
    has_many :rating_users, through: :ratings, source: :user
    has_many :reviews

    def get_description
        response = RestClient.get "https://www.freetogame.com/api/game?id=#{self.ftg_id}"
        game = JSON.parse(response)
        self.update(description: game['description'])
    end

    def calculate_and_set_rating
        if ratings.count > 0
            rating = self.ratings.average(:rating).round(1)
            self.update(rating: rating)
        end
    end

    def self.page_count
        pages = Game.count / 18
        pages += 1 unless pages * 18 == Game.count
        pages
    end
end
