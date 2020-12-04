/* eslint-disable semi */

function random(n) {
  var intvalue = Math.floor( Math.random() * n )
    return intvalue
}

function randomD(n) {
    return random(n) + 1
}

function randomRolls(n, s) {
  return []
}

module.exports.random = random
module.exports.randomD = randomD
module.exports.randomRolls = randomRolls
