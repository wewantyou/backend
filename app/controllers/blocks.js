'use strict'

let models

class BlocksController {
  constructor (projectModels) {
    models = projectModels
  }

  async create (req, res) {
    models.Blocks.create({
      block: req.body.block
    })
      .then((block) => {
        res.json({
          error: false,
          id: block.id
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
    models.Blocks.findById(req.params.id)
      .then((block) => {
        if (block === null) {
          res.json({
            error: true,
            message: `Block ${req.params.id} not found`,
          })
        } else {
          res.json({
            error: false,
            block,
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
    models.Blocks.findAll({})
    .then((blocks) => {
      if(blocks.length === 0) {
        res.json({
          error: true,
          message: "No blocks were found"
        })
      }else {
        res.json({
          error: false,
          blocks
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
    models.Blocks.findById(req.params.id)
      .then((block) => {
        if (block === null) {
          res.json({
            error: true,
            message: `Block ${req.params.id} not found`,
          })
        } else {
          const block = req.body.block

          block.block = block !== undefined ? block : block.block

          block.save()
            .then((block) => {
              res.json({
                error: false,
                block,
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

module.exports = BlocksController
