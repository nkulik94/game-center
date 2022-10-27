class GamesController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        session[:page] = params[:page] ? params[:page].to_i - 1 : (session[:page] || 0)
        game_page = Game.create_page(session[:page])
        render json: { page_count: Game.page_count(session[:main_list_filters]), active_page: session[:page] + 1, games: game_page }
    end

    def show
        game = Game.find(params[:id])
        render json: game, serializer: DetailedGameSerializer
    end

    def update
        game = Game.find(params[:id])
        like = game.likes.find_by(user_id: session[:user_id])
        like ? like.destroy : game.likes.create(user_id: session[:user_id])
        render json: game, status: :accepted
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
