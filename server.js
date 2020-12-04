/* eslint-disable semi */

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const { random, randomD, randomRolls } = require('./utils')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
  res.json({ about: 'This service generates a random number.' })
})

// Random number route
// Test this route with: http://localhost:4000/random?n=99
// Where n=99 sets the range of the random number returned
// app.get('/random', (req, res) => {
//   const { n } = req.query
//   const value = random(n)
//   res.json({ value })
// })

// /random?n=3&s=6
app.get('/randomrolls', (req, res) => {
  const { n, s } = req.query
  const rolls = randomRolls(n, s)
  res.json({ rolls }) // { "rolls": [1,2,3] }
})

app.get('/randomdie', (req, res) => {
  const { n } = req.query
  const value = randomD(n)
  res.json({ value, range:n })
  })

  // when this route is called, it returns /starwars/people?id=****
app.get('/starwars/people', async (req, res) => {
  const { id } = req.query
  // fetch returns a promise, await tells us to wait until the promise resolves
  const p = await fetch(`https://swapi.dev/api/people/${id}`)
  // put in request, stream the response as json
  const swjson = await p.json()
  const p2 = await fetch(swjson.homeworld)
  const hwjson = await p2.json()
  swjson.homeworld = hwjson
  // get response
  res.json(swjson)
})

  // when this route is called, it returns /chomp data
  app.get('/food', async (req, res) => {
    const { name } = req.query
    const { ingredients } = req.query
    // const { diet } = req.query

    try {
      // const url = `https://chompthis.com/api/v2/food/branded/name.php?api_key=${process.env.CHOMP_API_KEY}&name=Nutella`
      const url = `https://chompthis.com/api/v2/food/branded/name.php?api_key=${process.env.CHOMP_API_KEY}&name=${name}&ingredients=${ingredients}`

      // fetch returns a promise, await tells us to wait until the promise resolves
      const p = await fetch(url)
      const text = await p.json()
      console.log(text)
      res.json(text)
      // put in request, stream the response as json
      // const chjson = await p.json()
      // const p2 = await fetch(chjson.palm_oil_ingredients)
      // const poijson = await p2.json()
      // chjson.palm_oil_ingredients = poijson
      // // get response
      // res.json(chjson)
    } catch(error) {
      console.log(error)
      res.json(error.message)
    }
  })


const port = 4000
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
