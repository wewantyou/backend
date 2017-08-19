'use strict'

const Controller = require('../controllers/flows')

const router = function (app, models) {
  const controller = new Controller(models)

  app.route('/flows')
    .get(controller.listAll)
    .post(controller.create)

  app.route('/flows/:id')
    .get(controller.get)
    .put(controller.update)
}

module.exports = router
