puts "seeding database..."

def user_info
    username = Faker::Beer.name
    username = username.split(' ').join('')
    info = {
    name: Faker::Name.name,
    username: username,
    password: Faker::Alphanumeric.alphanumeric(number: 8, min_numeric: 3),
    bio: Faker::Lorem.sentences.join(' ')
    }
end

puts "creating users..."
User.create(user_info) until User.count == 10
User.create(name: "nkulik", username: "nkulik", password: "nkulik")

puts "getting games..."

response = RestClient.get "https://www.freetogame.com/api/games"

games = JSON.parse(response)

games.each do |game_hash|
    Game.create(
        title: game_hash['title'],
        thumbnail: game_hash['thumbnail'],
        short_description: game_hash['short_description'],
        game_url: game_hash['game_url'],
        platform: game_hash['platform'],
        publisher: game_hash['publisher'],
        developer: game_hash['developer'],
        release_date: game_hash['release_date']
    )
end

puts "done seeding!"