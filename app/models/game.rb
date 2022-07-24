class Game < ApplicationRecord

    def get_description
        response = RestClient.get "https://www.freetogame.com/api/game?id=#{self.ftg_id}"
        game = JSON.parse(response)
        self.update(description: game['description'])
    end
end
