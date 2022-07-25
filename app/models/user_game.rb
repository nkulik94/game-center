class UserGame < ApplicationRecord
    belongs_to :user
    belongs_to :game

    def random_boolean?
        [true, false].sample
    end

    def new_review
        review = random_boolean? ? Faker::Lorem.sentences.join(' ') : nil
    end

    def new_rating
        rating = rand(1..5)
        random_boolean? ? rating : nil
    end

    def generate_data
        update(liked: random_boolean?, review: new_review, rating: new_rating)
    end
end
