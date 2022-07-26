class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :thumbnail, :short_description, :likes, :average_rating, :review_count

  def likes
    likes = self.object.user_games.filter { |game| game.liked }
    likes.count
  end

  def average_rating
    average = self.object.user_games.average(:rating)
    if average
      average.round(2)
    end
  end

  def review_count
    reveiwed_games = self.object.user_games.filter { |game| game.review }
    reveiwed_games.count
  end
end
