class LikesController < ApplicationController
    before_action :authorize

    private

    # def like_params
    #     params.permit(:game_id)
    # end

    def authorize
        return render json: { error: 'Please log in to complete this action' }, status: :unauthorized unless session.include? :user_id
    end
end
