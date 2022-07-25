class Game < ApplicationRecord
    has_many :user_games
    has_many :users, through: :user_games

    def get_description
        response = RestClient.get "https://www.freetogame.com/api/game?id=#{self.ftg_id}"
        game = JSON.parse(response)
        self.update(description: game['description'])
    end
end
