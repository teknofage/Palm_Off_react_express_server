# Palm OFF React Express Server Starter

This starter project is meant to work with the React front end [here](https://github.com/teknofage/Palm_Off_react_front_end). 

The purpose of this project is to provide a backend API for the Palm OFF frontend. 

This project provides a simple backend API that serves JSON on a couple routes. 

## Getting started

You'll need to install dependencies. 

- `npm install` 
- Run the project with node or ndoemon
  - `node server.js` or `nodemon server.js`

## API Documentation 

The API of the current project has two endpoints that return JSON. 

- `/about` 
	- returns - `{ about: 'description string' }`
	- Example - `/about`

You should test the API for yourself to make sure everything is running. Follow the instructions above and launch the Express Server.

There are three end points and each returns JSON. Type these into the address bar of the browser or just click the links below: 

- [http://localhost:4000](http://localhost:4000) default route
- [http://localhost:4000/about](http://localhost:4000/about) returns the about text


## Tests 

Run the tests: 

`npm test`


