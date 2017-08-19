'use strict'

const Controller = require('../controllers/forms')

const router = function (app) {
  const controller = new Controller()

  app.route('/forms')
    .get(controller.listAll)
}

module.exports = router
