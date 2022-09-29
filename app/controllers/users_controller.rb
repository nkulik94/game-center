class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: User.all, each_serializer: UserListSerializer
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, include: ['liked_games', 'ratings', 'ratings.game', 'reviews'], status: :created
    end

    def show
        if session[:user_id]
            render json: User.find(session[:user_id]), include: ['liked_games', 'ratings', 'ratings.game', 'reviews'], status: :created
        else
            render json: { error: "Unauthorized" }, status: :unauthorized
        end
    end

    def list
        user = User.last
        list = user.get_list(params[:list], params[:page])
        render json: list
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, include: ['liked_games', 'ratings', 'ratings.game', 'reviews'], status: :accepted
    end

    def destroy
        user = User.find(params[:id])
        if user.username == 'QB1'
            render json: { error: 'Please do not delete the demo user'}, status: :unauthorized
        else
            user.destroy
            head :no_content
        end
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
