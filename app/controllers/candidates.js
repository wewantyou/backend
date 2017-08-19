'use strict'

const fullContactHelper = require('../helpers/fullContact')

class CandidatesController {
  listAll (req, res) {
    res.send()
  }
    create(req, res, models) {
        models.Candidates.create({
            name: req.body.name,
            fullContactProfile: fullContactHelper.find(req.body.email),
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
}

module.exports = CandidatesController
