const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const apicache = require('apicache')
const { SlowBuffer } = require('buffer')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res, next) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    })
        
    
    apicommand = params.get('q')
    const birdweatherURL = `${API_BASE_URL}${API_KEY_VALUE}/${apicommand}`
    
    const apiRes = await needle('get', birdweatherURL)
    const data = apiRes.body
    
    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${birdweatherURL}`)
    }

    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
