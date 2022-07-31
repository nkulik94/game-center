class ReviewsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def create
        user = User.find(session[:user_id])
        rating = user.ratings.find_by(game_id: params[:game_id], user_id: user.id)
        if rating
            review = user.reviews.create!(game_id: params[:game_id], content: params[:content], rating_id: rating.id)
            render json: review, status: :created, serializer: UpdateReviewSerializer
        else
            render json: { error: "Please rate this game before leaving a review" }, status: :unprocessable_entity
        end
    end

    def update
        review = Review.find(params[:id])
        review.update(content: params[:content])
        render json: review, status: :accepted, serializer: UpdateReviewSerializer
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

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
