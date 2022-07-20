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

puts "done seeding!"