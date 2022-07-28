class Review < ApplicationRecord
    belongs_to :game
    belongs_to :user
    belongs_to :rating

    validates :content, presence: true
end
