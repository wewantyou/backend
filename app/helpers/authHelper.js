'use strict'

require('dotenv').config()

const credentials = {
  client: {
    id: process.env.OFFICE_365_ID,
    secret: process.env.OFFICE_365_PASSWORD,
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com',
    authorizePath: 'common/oauth2/v2.0/authorize',
    tokenPath: 'common/oauth2/v2.0/token,'
  },
}

const oauth2 = require('simple-oauth2').create(credentials)

const redirectURI = 'http://localhost:8080/mail'

const scopes = [
  'openid',
  'User.Read',
  'Mail.Read',
]

function getAuthUrl () {
  const returnVal = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirectURI,
    scope: scopes.join(' '),
  })

  console.log(returnVal)

  return returnVal
}

exports.getAuthUrl = getAuthUrl
