'use strict'

let models

class FlowsController {
  constructor (projectModels) {
    models = projectModels
  }

  async create (req, res) {
    models.Flows.create({
      order: req.body.order
    })
      .then((flow) => {
        res.json({
          error: false,
          id: flow.id
        })
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err
        })
      })
  }

  get (req, res) {
    models.Flows.findById(req.params.id)
      .then((flow) => {
        if (flow === null) {
          res.json({
            error: true,
            message: `Flow ${req.params.id} not found`,
          })
        } else {
          res.json({
            error: false,
            flow,
          })
        }
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err,
        })
      })
  }

  listAll (req, res) {
    models.Flows.findAll({})
    .then((flows) => {
      if(flows.length === 0) {
        res.json({
          error: true,
          message: "No flows were found"
        })
      }else {
        res.json({
          error: false,
          flows
        })
      }
    })
    .catch((err) => {
      res.json({
        error: true,
        message: err
      })
    })
  }

  update (req, res) {
    models.Flows.findById(req.params.id)
      .then((flow) => {
        if (flow === null) {
          res.json({
            error: true,
            message: `Flow ${req.params.id} not found`,
          })
        } else {
          const flow = req.body.flow

          flow.order = order !== undefined ? order : flow.order

          flow.save()
            .then((flow) => {
              res.json({
                error: false,
                flow,
              })
            })
        }
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err,
        })
      })
  }
}

module.exports = FlowsController
