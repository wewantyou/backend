'use strict'

class FormsController {

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
  listAll (req, res, models) {
    models.Forms.findAll({})
    .then((forms) => {
      if(forms == null){
        res.json({
          error: true,
          message: "No forms were found"
        })
      }else {
        res.json({
          error: false,
          forms
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
