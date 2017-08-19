'use strict'

const fullContactHelper = require('../helpers/full_contact')

class CandidatesController {
  listAll (req, res) {
    res.send()
  }

  async create (req, res, models) {
    const fullContactProfile = await fullContactHelper.find(req.body.email)

    models.Candidates.create({
      name: req.body.name,
      fullContactProfile: fullContactProfile,
      email: req.body.email
    })
      .then((candidate) => {
        res.json({
          error: false,
          id: candidate.id
        })
      })
      .catch((err) => {
        res.json({
          error: true,
          message: err
        })
      })
  }

  get (req, res, models) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate == null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          res.json({
            error: false,
            candidate,
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

  update (req, res, models) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate == null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          const name = req.body.name
          const form = req.body.form

          candidate.name = name !== undefined ? name : candidate.name
          candidate.form = form !== undefined ? form : candidate.form

          candidate.save()
            .then((candidate) => {
              res.json({
                error: false,
                candidate,
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

module.exports = CandidatesController
