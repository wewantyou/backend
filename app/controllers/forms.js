'use strict'

class FormsController {
  listAll (req, res) {
    res.send()
  }

  create (req, res, models) {
    models.Forms.create({
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
