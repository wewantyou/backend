'use strict'

const Controller = require('../controllers/candidates')

const router = function (app, models) {
  const controller = new Controller()

  app.route('/candidates')
    .get((req, res) => {
      controller.listAll(req, res, models)
    })
    .post((req, res) => {
      controller.create(req, res, models)
    })

  app.route('/candidates/:id')
    .get((req, res) => {
      controller.get(req, res, models)
    })
    .put((req, res) => {
      controller.update(req, res, models)
    })
}

module.exports = router
