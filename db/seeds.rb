User.destroy_all
Game.destroy_all

puts "seeding database..."

def user_info
    username = Faker::Beer.name
    username = username.split(' ').join('')
    info = {
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    username: username,
    password: Faker::Alphanumeric.alphanumeric(number: 8, min_numeric: 3),
    bio: Faker::Lorem.sentences.join(' '),
    avatar_url: Faker::Avatar.image
    }
end

puts "creating users..."
User.create(user_info) until User.count == 100
User.create(first_name: "Jackson", last_name: 'Lamar', username: "QB1", password: "ljera", avatar_url: Faker::Avatar.image, bio: Faker::Lorem.sentences.join(' '))

puts "getting games..."

response = RestClient.get "https://www.freetogame.com/api/games"

games = JSON.parse(response)

puts 'creating games...'

games.each do |game_hash|
    Game.create(
        title: game_hash['title'],
        thumbnail: game_hash['thumbnail'],
        short_description: game_hash['short_description'],
        game_url: game_hash['game_url'],
        platform: game_hash['platform'],
        publisher: game_hash['publisher'],
        developer: game_hash['developer'],
        release_date: game_hash['release_date'],
        ftg_id: game_hash['id'],
        genre: game_hash['genre']
    )
end

puts "getting descriptions..."

Game.all.each do |game|
    puts game.title
    # This is to avoid going over freetogame rate limit
    sleep(0.30)
    game.get_description
end

puts "creating ratings"

User.all.each do |user|
    rand(10..Game.count).times do
        user.likes.create(game_id: Game.all.sample.id)
        user.ratings.create(game_id: Game.all.sample.id, rating: rand(1..5))
        rating = user.ratings.all.sample
        user.reviews.create(rating_id: rating.id, game_id: rating.game_id, content: Faker::Lorem.sentences.join(' '))
        puts user.likes.count
    end
end

User.all.each { |user| user.set_tier }

Game.all.each do |game|
    game.calculate_and_set_rating
end

puts "done seeding!"