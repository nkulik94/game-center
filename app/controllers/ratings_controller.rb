class RatingsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        render json: Rating.all, each_serializer: RatingCreateUpdateSerializer
    end

    def create
        game = Game.find(params[:game_id])
        rating = game.ratings.create!(rating: params[:rating], user_id: session[:user_id])
        game.calculate_and_set_rating
        render json: rating, serializer: RatingCreateUpdateSerializer
    end

    def update
        rating = Rating.find(params[:id])
        rating.update(rating: params[:rating])
        rating.game.calculate_and_set_rating
        render json: rating, serializer: RatingCreateUpdateSerializer
    end

    def destroy
        rating = Rating.find(params[:id])
        game = rating.game
        rating.destroy
        game.calculate_and_set_rating
        render json: game
    end

    private

    def rating_params
        params.permit(:rating, :game_id)
    end

    def authorize
        return render json: { error: 'Please log in to complete this action' }, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response
        render json: { error: "Not found" }, status: :not_found
    end
end
