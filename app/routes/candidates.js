'use strict'

const Controller = require('../controllers/candidates')
const candidatesHelper = require('../helpers/candidates')

const router = function (app, models) {
  const controller = new Controller(models)

  app.route('/candidates')
    .get(controller.listAll)
    .post(controller.create)

  app.route('/candidates/:id')
    .get(controller.get)
    .put(controller.update)

  app.route('/candidates/:id/comments')
    .post(controller.insertComment)

  app.route('/candidates/:id/like')
    .post(controller.like)

  app.route('/candidates/:id/superlike')
    .post(controller.superLike)

  app.route('/candidates/:id/points')
    .get(controller.getPoints)

  app.route('/candidates/setup')
    .post(controller.setup)
}

module.exports = router
