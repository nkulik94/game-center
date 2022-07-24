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
        ftg_id: game_hash['id']
    )
end

puts "done seeding!"