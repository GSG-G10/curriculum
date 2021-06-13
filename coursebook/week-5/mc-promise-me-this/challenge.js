const https = require('https')

const makePokeUrl = pokemon => `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
const pikaUrl = makePokeUrl('pikachu')

const myApiCall = (url, callback) => {
  https
    .get(url, resp => {
      let data = ''
      resp.on('data', chunk => {
        data += chunk
      })
      resp.on('end', () => {
        try {
          callback(null, JSON.parse(data))
        } catch (e) {
          callback('Oops, this isn\'t JSON')
        }
      })
    })
    .on('error', err => {
      callback(err.message)
    })
}

myApiCall(pikaUrl, (err, res) => {
  if (err) console.log(res)
  else console.log(res)
})

//Now let's make it a Promise

// const myPromiseApi =

//And call it here...
