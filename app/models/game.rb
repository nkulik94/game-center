class Game < ApplicationRecord
    has_many :likes
    has_many :liking_users, through: :likes, source: :user
    has_many :reviews

    def get_description
        response = RestClient.get "https://www.freetogame.com/api/game?id=#{self.ftg_id}"
        game = JSON.parse(response)
        self.update(description: game['description'])
    end
end
