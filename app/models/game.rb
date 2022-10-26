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

    def self.apply_filters filters
        Game.where(filters)
    end

    # def self.game_page

    # end

    def self.page_count filters = {}
        game_count = Game.where(filters).count
        pages = game_count / 18
        pages += 1 unless pages * 18 == game_count
        pages
    end

    def serialize
        serialized_game = ActiveModelSerializers::Adapter::Json.new(
        GameSerializer.new(self)
        ).serializable_hash
        serialized_game[:game]
    end

    def self.serialize_group games
        serialized_games = games.map { |game| game.serialize }
        serialized_games
    end
end
