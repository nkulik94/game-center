# Gamer Spot

## How to run this app

To run the app locally, you will need to have Postgres installed. To make sure the posgres service is running, run `sudo service postgresql start`. To run the app, run `rails s` to start the server, and `npm start --prefix client` to open the app in the browser. Additionally, the app is deployed [here](https://gamer-spot.herokuapp.com/).

## What it is

This app was developed as a project for Flatiron School. Users can view free-to-play online games, obtained via the [Freetogame](https://www.freetogame.com/api-doc) API. Logged-in users can like, rate, and review games, as well as view other users' reviews and their own liked, rated, and reviewed games.

> Note: This is a demo project. Most of the user data is randomly simulated and does not reflect any actual user's opinions (something which is quite obvious with one look at the reviews). Freetogame's [website](https://www.freetogame.com/) itself has similar features (only better, I'll admit), with presumably a more robust (and genuine) user base.

## Technologies

This app uses a Rails API with a PostgreSQL database as a backend and a React frontend. Almost all of the styling was done using the [Material UI](https://mui.com/material-ui/getting-started/overview/) component library. The backend uses [bcrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) to hash and securely store user's passwords. `active_model_serializer` was used to organize and send back the appropriate json data.

## Models/tables

The database uses five models, `User`, `Game`, `Like`, `Rating`, and `Review`. `User` and `Game` have 