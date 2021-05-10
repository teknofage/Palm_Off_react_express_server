/* eslint-disable semi */
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

require('./controllers/auth.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser()); // Add this after you initialize express.

// ** Proxy from React can't get at '/' for some reason?
// Apparently this is expected behavior... **
// Test this route with: localhost:4000/
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// A simple route that returns a JSON object
// Test this route with:
app.get('/about', (req, res) => {
  // This Object is converted to JSON and returned.
  res.json({ 
      about: 'This service pulls data about hundreds of thousands of food products and gives up-to-date information about the allergen and dietary status of ingredients, and whether it contains any palm oil product. For more information about palm oil, visit: https://orangutanfoundation.org.au/palm-oil/' })
})

// when this route is called, it returns /chomp data
app.get('/food', async (req, res) => {
  const { name, ingredients } = req.query

  try {
    // const url = `https://chompthis.com/api/v2/food/branded/name.php?api_key=${process.env.CHOMP_API_KEY}&name=Nutella`
    const url = `https://chompthis.com/api/v2/food/branded/name.php?api_key=${process.env.CHOMP_API_KEY}&name=${name}&ingredients=${ingredients}`
    // console.log(url)
    // fetch returns a promise, await tells us to wait until the promise resolves
    const p = await fetch(url)
    const text = await p.json()
    console.log(text)
    res.json(text)
    // put in request, stream the response as json
    // get response
  } catch(error) {
    console.log(error)
    res.json(error)
  }
})

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};
app.use(checkAuth);

require('./controllers/searches.js')(app);
require('./controllers/auth.js')(app);

const port = 4000
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
