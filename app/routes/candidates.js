'use strict'

const Controller = require('../controllers/candidates')

const router = function (app) {
  const controller = new Controller()

  app.route('/candidates')
    .get(controller.listAll)
}

module.exports = router
