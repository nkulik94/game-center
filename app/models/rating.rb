class Rating < ApplicationRecord
    belongs_to :user
    belongs_to :game

    validates :rating, inclusion: { in: (1..5), message: 'must be between 1 and 5' }
    validates :rating, numericality: { only_integer: true }
    validates :game_id, uniqueness: {scope: :user_id}
end
