'use strict'

const FormsSchema = require('../models/forms')

class FormsController {
  listAll (req, res) {
    res.send()
  }

  create (req, res) {
    FormsSchema.create({
      block: req.body,
    })
      .then(() => {
        res.json({
          error: false,
        })
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err,
        })
      })
  }
}

module.exports = FormsController
