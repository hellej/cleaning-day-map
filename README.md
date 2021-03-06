[Demo](https://cleaningdaymap.firebaseapp.com/) & [tuntikirjanpito](https://docs.google.com/spreadsheets/d/1CA10n9ks1efBbcJDzxuY8YjX9_4bsEuW_Ze07xFwPgY/edit?usp=sharing) [FullStack-kurssiin](https://fullstackopen.github.io/)

## Cleaning Day Map
An interactive web map application for exploring the locations of vendor tables in the supposed context of the annual cleaning day event (a day when anyone can host a pop-up flea market). The app allows users to add new vendor tables to the map and search for tables by using both a search field and the map window as filters.

The initial and main objective of the project was to explore and utilize ways of using Mapbox GL maps within a React+Redux app. This is just a demo / proof of concept and not part of the official [Cleaning Day](http://siivouspaiva.com/en/info/basics-of-cleaning-day) event by any means. 

### Built With
* React
* Redux & Thunk
* Mapbox GL JS
* React Router
* Tests (end-to-end): Cypress
* Hosting: Firebase
* Database & authentication: Firebase

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

### Installation
```
$ git clone git@github.com:hellej/cleaning-day-map.git
$ cd cleaning-day-map
$ npm install
$ npm start
```
Update your Mapbox access token to `src/components/Map.js`<br>
Open browser to http://localhost:3000/

### License
MIT