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
User.create(user_info) until User.count == 10
User.create(first_name: "naftali", last_name: 'kulik', username: "nkulik", password: "nkulik", avatar_url: "https://drive.google.com/uc?export=view&id=12O1_1NbBDxe0KDwPkMHP897AlJVal0o4", bio: Faker::Lorem.sentences.join(' '))

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

# Game.all.each do |game|
#     puts game.title
#     # This is to avoid going over freetogame rate limit
#     sleep(0.30)
#     game.get_description
# end

puts "creating ratings"

User.all.each do |user|
    rand(100..Game.count).times do
        user.likes.create(game_id: Game.all.sample.id)
        user.ratings.create(game_id: Game.all.sample.id, rating: rand(1..5))
        puts user.likes.count
    end
end

# User.all.each do |user|
#     100.times do
#         game_id = rand(1..Game.count)
#         game = Game.find_by(id: game_id)
#         # doing this conditional for edge cases
#         if game
#             user_game = UserGame.find_or_create_by(user_id: user.id, game_id: game.id)
#             user_game.generate_data
#             puts user_game.liked
#         end
#     end
# end

puts "done seeding!"