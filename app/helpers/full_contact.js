'use strict'

const axios = require('axios')
require('dotenv').config()

async function find (email) {
  return await axios({
    method: 'get',
    url: `https://api.fullcontact.com/v2/person.json?email=${email}&macromeasures=true`,
    headers: {'X-FullContact-APIKey': process.env.FULL_CONTACT_API_KEY}
  }).then((res) => {
    return res.data
  }).catch((err) => {
    return null
  })
}

function getGithub (profile) {
  const social = profile.socialProfiles

  if (social === undefined) {
    return null
  }

  for (let i = 0; i < social.length; ++i) {
    if (social[i].type === 'github' || social[i].typeId === 'github') {
      return social[i].username
    }
  }

  return null
}

function getLinkedin (profile) {
  const social = profile.socialProfiles

  if (social === undefined) {
    return null
  }

  for (let i = 0; i < social.length; ++i) {
    if (social[i].type === 'linkedin' || social[i].typeId === 'linkedin') {
      return social[i].username
    }
  }

  return null
}

function getFacebook (profile) {
  const social = profile.socialProfiles

  if (social === undefined) {
    return null
  }

  for (let i = 0; i < social.length; ++i) {
    if (social[i].type === 'facebook' || social[i].typeId === 'facebook') {
      let url = social[i].url
      url = url.split('/')

      return url[url.length - 1]
    }
  }

  return null
}

function compareInterests (a, b) {
  if (a.score < b.score) {
    return 1
  } else if (a.score > b.score) {
    return -1
  } else {
    return 0
  }
}

function rankInterests (profile) {
  const interests = profile.macromeasures.interests.slice(0) // clone array

  return interests.sort(compareInterests)
}

module.exports = {
  find,
  getGithub,
  getLinkedin,
  getFacebook,
  rankInterests,
}
