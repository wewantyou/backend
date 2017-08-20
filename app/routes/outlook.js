'use strict'

const Controller = require('../controllers/outlook')
const passport = require('passport')

const router = function (app, models) {
  const controller = new Controller(models)

  app.route('/outlook/login')
    .get(passport.authenticate('windowslive', {
      scope: [
        'openid',
        'profile',
        'offline_access',
        'https://outlook.office.com/Mail.Read',
        'https://outlook.office.com/Mail.Send',
      ]
    }))

  app.route('/outlook/callback')
    .get(passport.authenticate('windowslive', { failureRedirect: '/outlook' }))

  app.route('/outlook')
    .get(controller.read)
}

module.exports = router
