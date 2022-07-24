class GamesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        render json: Game.all
    end

    def show
        game = Game.find(params[:id])
        if game.description
            render json: game, serializer: DetailedGameSerializer
        else
            game.get_description
            render json: game, serializer: DetailedGameSerializer
        end
    end

    private

    def render_not_found_response
        render json: { error: "Game not found" }, status: :not_found
    end
end
