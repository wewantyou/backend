'use strict'

const Controller = require('../controllers/forms')

const router = function (app, models) {
  const controller = new Controller()

  app.route('/forms')
    .get(controller.listAll)
    .post((req, res) => {
      controller.create(req, res, models)
    })
}

module.exports = router
