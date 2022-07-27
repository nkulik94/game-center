class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, include: ['liked_games', 'ratings', 'ratings.game'], status: :created
    end

    def show
        if session[:user_id]
            render json: User.find(session[:user_id]), include: ['liked_games', 'ratings', 'ratings.game'], status: :created
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, include: ['liked_games', 'ratings', 'ratings.game']
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :username, :password, :password_confirmation, :bio, :avatar_url)
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
