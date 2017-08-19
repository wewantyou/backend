'use strict'

const axios = require('axios')
require('dotenv').config()

async function find (email) {
  return await axios({
    method: 'get',
    url: `https://api.fullcontact.com/v2/person.json?email=${email}&macromeasures=true`,
    headers: {'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY}
  }).then((res) => {
    console.log(res.data)
    return res.data
  }).catch((err) => {
    return null
  })
}

module.exports = {
  find
}
