'use strict'

const Controller = require('../controllers/forms')

const router = function (app, models) {
  const controller = new Controller()

  app.route('/forms')
    .get(controller.listAll)
    .post((req, res) => {
      controller.create(req, res, models)
    })

  app.route('/forms/:id')
    .get((req, res) => {
      controller.get(req, res, models)
    })
    .put((req, res) => {
      controller.update(req, res, models)
    })
}

module.exports = router
