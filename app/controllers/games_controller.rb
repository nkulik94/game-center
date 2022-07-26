class GamesController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        render json: Game.all
    end

    def show
        game = Game.find(params[:id])
        render json: game, serializer: DetailedGameSerializer
    end

    def update
        game = Game.find(params[:id])
        like = game.likes.find_by(user_id: session[:user_id])
        like ? like.destroy : game.likes.create(user_id: session[:user_id])
        render json: game
    end

    private

    def game_params
        params.permit(:likes)
    end

    def render_not_found_response
        render json: { error: "Game not found" }, status: :not_found
    end

    def authorize
        return render json: { error: 'Please log in to complete this action' }, status: :unauthorized unless session.include? :user_id
    end
end
