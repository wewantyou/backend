const passport = require('passport')
const OutlookStrategy = require('passport-outlook').Strategy
const outlook = require('node-outlook')
const request = require('request-promise-native')

require('dotenv').config()

const OUTLOOK_CLIENT_ID = process.env.OFFICE_365_ID
const OUTLOOK_CLIENT_SECRET = process.env.OFFICE_365_PASSWORD

let user

function readMail () {
  outlook.base.setApiEndpoint('https://outlook.office.com/api/v2.0')

  const queryParams = {
    '$select': 'Subject,ReceivedDateTime,From',
    '$orderby': 'ReceivedDateTime desc',
    '$top': 10,
  }

  const userInfo = {
    email: 'wilkmaia@live.com'
  }

  outlook.mail.getMessages({token: user.accessToken, folderId: 'archive', odataParams: queryParams, user: userInfo},
  function(error, result){
    if (error) {
      console.log('getMessages returned an error: ' + error)
    }
    else if (result) {
      result.value.forEach(function(message) {
        const newMsg = {
          Subject: 'test',
          Importance: 'High',
          Body: {
            ContentType: 'HTML',
            Content: 'They were <b>awesome</b>!'
          },
          ToRecipients: [
            {
              EmailAddress: {
                Address: message.From.EmailAddress.Address
              }
            }
          ]
        }

        outlook.mail.sendNewMessage({
          token: user.accessToken,
          message: newMsg,
          useMe: true,
        }, (err) => {
          if (err) {
            console.log(`sendNewMessage returned an error: ${err}`);
          } else {
            // Not working
            outlook.mail.updateMessage({
              token: user.accessToken,
              messageId: message.Id,
              update: {
                IsRead: true,
              },
              useMe: true,
            }, (err) => {
              if (err) {
                console.log(`updateMessage returned an error: ${err}`)
              } else {
                console.log(`Mail from ${message.From.EmailAddress.Address} dealt and marked as read.`)
              }
            })
          }
        })
      })
    }
  })
}

class OutlookController {
  constructor () {
    passport.use(new OutlookStrategy({
        clientID: OUTLOOK_CLIENT_ID,
        clientSecret: OUTLOOK_CLIENT_SECRET,
        callbackURL: 'https://wilkmaia.xyz/outlook/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        user = {
          outlookId: profile.id,
          name: profile.DisplayName,
          email: profile.EmailAddress,
          accessToken:  accessToken
        }
        if (refreshToken)
          user.refreshToken = refreshToken
        if (profile.MailboxGuid)
          user.mailboxGuid = profile.MailboxGuid
        if (profile.Alias)
          user.alias = profile.Alias

        done()
      }
    ))
  }

  read (req, res) {
    readMail()

    res.json({
      error: false,
      message: `Reading messages...`,
    })
  }
}

module.exports = OutlookController
