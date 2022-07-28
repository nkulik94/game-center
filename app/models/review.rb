class Review < ApplicationRecord
    belongs_to :game
    belongs_to :user
    belongs_to :rating

    validates :content, presence: true
    validates :game_id, uniqueness: {scope: :user_id}
    validates :rating_id, uniqueness: true
end
