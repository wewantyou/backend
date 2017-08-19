'use strict'

class FormsController {
  listAll (req, res) {
    res.send()
  }

  create (req, res, models) {
    models.Forms.create({
      block: req.body.block,
    })
      .then((form) => {
        res.json({
          error: false,
          id: form.id,
        })
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err,
        })
      })
  }

  get (req, res, models) {
    const id = req.params.id

    models.Forms.findById(id)
      .then((form) => {
        res.json({
          error: false,
          form: form.block,
        })
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err,
        })
      })
  }

  update (req, res, models) {
    const id = req.params.id

    models.Forms.findById(id)
      .then((form) => {
        form.block = req.body.block
        form.save()
          .then((form) => {
            res.json({
              error: false,
              form: form.block,
            })
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
