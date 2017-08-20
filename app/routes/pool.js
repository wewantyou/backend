'use strict'

const Controller = require('../controllers/pool')

const router = function (app, models) {
  const controller = new Controller(models)

  app.route('/pool')
    .get(controller.getNextFromPool)
}

module.exports = router
