# Gamer Spot

## How to run this app

To run the app locally, you will need to have Postgres installed. To make sure the postgres service is running, run `sudo service postgresql start`. To run the app, run `rails s` to start the server, and `npm start --prefix client` to open the app in the browser. Run `rails db:migrate` to run the migrations, and `rails db:seed` to seed the database. Additionally, the app is deployed [here](https://gamer-spot.herokuapp.com/).

## What it is

This app was developed as a project for Flatiron School. Users can view free-to-play online games, obtained via the [Freetogame](https://www.freetogame.com/api-doc) API. Logged-in users can like, rate, and review games, as well as view other users' reviews and their own liked, rated, and reviewed games.

> Note: This is a demo project. Most of the user data is randomly simulated and does not reflect any actual user's opinions (something which is quite obvious with one look at the reviews). Freetogame's [website](https://www.freetogame.com/) itself has similar features (only better, I'll admit), with presumably a more robust (and genuine) user base.

## Technologies

This app uses a Rails API with a PostgreSQL database as a backend and a React frontend. Almost all of the styling was done using the [Material UI](https://mui.com/material-ui/getting-started/overview/) component library. The backend uses [bcrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) to hash and securely store user's passwords. `active_model_serializer` was used to organize and send back the appropriate json data.

## Models/tables

The database uses five models, `User`, `Game`, `Like`, `Rating`, and `Review`. The `likes`, `ratings`, and `reviews` tables all have one-to-one relationships with both the `users` and `games` tables. In addition, `games` and `users` have many-to-many relationships through those join tables. These relationships are all used in different ways throughout the app to display associated data as needed. In addition, reviews belong to ratings to easier display rating information along with reviews.

## Routes/actions

### User Routes

`get /login` - handled by the show action in the sessions controller. Takes login credentials as params and upon authentication saves the user id to the `sessions` hash and sends the user information back in json format.

`delete /logout` - handled by the destroy action in the sessions controller. Removes the user id from the `sessions` hash to log the user out.

`post /signup` - handled by `users#create`, takes params to create a new account and saves the id to the `sessions` hash. Sends user information back as json

`get users` - `users#index`, sends json containing basic, public user information.

`patch users/:id` - `users#update`, allows user data such as bio and avatar to be modified by the user.

`delete users/:id` - `users#destroy`, to delete an account.

### Game routes

`get /games` - `games#index`, sends a list of all games with basic information to be displayed as part of a list

`get /games/:id` - `games#show`, sends more detailed information about a specific game

`patch /games/:id` - `games#update`, handles adding/subtracting likes, using the user id from the `sessions` hash to create the correct instance of `Like`. Sends back the information about that game.

### Rating routes

`post /ratings` - `ratings#create`, creates a new rating, sends the `Rating` instance in the response along with relevant game and user information.

`patch /ratings` - `ratings#update`, updates rating, sends the rating back

`delete /ratings/:id` - `ratings#destroy`, deletes a rating, sends back information about the game.

### Review routes

`post /reviews` - `reviews#create`, creates a new review, sends it back.

`patch /reviews/:id` - `reviews#update`, modifies review, sends it back.

`delete /reviews/:id` - `reviews#destroy`, deletes a review.

## Frontend information

The user information is saved to state on login, with a separate state for profile information, ratings, reviews, and likes. These states and their setter functions are all available throughout the app via context. User actions such as rating or reviewing games update all of the necessary states accordingly, a long and occasionally tedious process that quite possibly could have been done better. The game list and setter function are also available via context. The user context also contains objects with the game ids of the user's liked, rated, and reviewed games as keys. This allows the game list to easily access this information and display the icons differently. (For example, a game that has been liked by the current user will display a filled heart icon, and one which has not will display only an outline.)

The frontend uses react-router-dom for client-side routing, and has routes for a home page, game list page, user list page, and contact page. Additionally there are routes for a detailed game rendering (using route params), and for signup, login, and profile pages.

This is it, the most comprehensive project I've developed to date! For any questions or comments, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/naftali-kulik-se/) or email me at [naftalikulikse@gmail.com](mailto:naftalikulikse@gmail.com).

Thanks for checking it out,  
Naftali Kulik