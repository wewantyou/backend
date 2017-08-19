'use strict'

const Controller = require('../controllers/blocks')

const router = function (app, models) {
  const controller = new Controller(models)

  app.route('/blocks')
    .get(controller.listAll)
    .post(controller.create)

  app.route('/blocks/:id')
    .get(controller.get)
    .put(controller.update)
}

module.exports = router
