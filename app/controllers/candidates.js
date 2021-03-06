'use strict'

const fullContactHelper = require('../helpers/full_contact')
const githubHelper = require('../helpers/github')
const candidatesHelper = require('../helpers/candidates')

let models
let minPoints

class CandidatesController {
  constructor (projectModels) {
    models = projectModels

    models.Setups.findById(1)
      .then((setup) => {
        if (setup !== null) {
          // minPoints = setup.min_points
          minPoints = 500
        } else {
          minPoints = 500

          models.Setups.create({
            min_points: minPoints,
          })
        }
      })
  }

  async create (req, res) {
    let user
    let github = req.body.github
    let linkedin = req.body.linkedin
    let facebook = req.body.facebook
    let fullContactProfile = await fullContactHelper.find(req.body.email)

    if (fullContactProfile === null) {
      fullContactProfile = {}
    }

    if (github !== undefined) {
      fullContactProfile.github = JSON.parse(await githubHelper.find(github))
    } else if (github = fullContactHelper.getGithub(fullContactProfile)) {
      fullContactProfile.github = JSON.parse(await githubHelper.find(github))
    } else {
      fullContactProfile.github = JSON.parse(await githubHelper.find(req.body.email))

      if (fullContactProfile.github !== null) {
        github = fullContactProfile.github.login
      }
    }

    if (fullContactProfile.github && fullContactProfile.github.id) {
      user = fullContactProfile.github.login

      fullContactProfile.github.repos_statistics = await githubHelper.getReposStats(fullContactProfile.github.repos_url)
    }

    if (fullContactProfile.macromeasures && fullContactProfile.macromeasures.interests.length > 5) {
      fullContactProfile.macromeasures.ranked_interests = fullContactHelper.rankInterests(fullContactProfile)
    }

    if (linkedin === undefined) {
      linkedin = fullContactHelper.getLinkedin(fullContactProfile)
    }

    if (facebook === undefined) {
      facebook = fullContactHelper.getFacebook(fullContactProfile)
    }

    models.Candidates.create({
      name: req.body.name,
      fullContactProfile: fullContactProfile,
      email: req.body.email,
      form: req.body.form,
      github: github,
      linkedin: linkedin,
      facebook: facebook,
      referral: req.body.referral,
      referral_level: req.body.referral_level,
      BlockId: 1,
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

  get (req, res) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate === null) {
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

  listAll (req, res) {
    models.Candidates.findAll({})
    .then((candidates) => {
      if(candidates.length === 0) {
        res.json({
          error: true,
          message: "No candidates were found"
        })
      }else {
        res.json({
          error: false,
          candidates
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
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate === null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          const name = req.body.name
          const form = req.body.form
          const referral = req.body.referral
          const referralLevel = req.body.referral_level
          const linkedin = req.body.linkedin
          const github = req.body.github

          candidate.name = name !== undefined ? name : candidate.name
          candidate.form = form !== undefined ? form : candidate.form
          candidate.referral_level = referralLevel !== undefined ?
            referralLevel : candidate.referral_level
          candidate.referral = referral !== undefined ? referral : candidate.referral
          candidate.github = github !== undefined ? github : candidate.github
          candidate.linkedin = linkedin !== undefined ? linkedin : candidate.linkedin

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

  insertComment (req, res) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        console.log(candidate.comments)
        if (candidate === null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          const author = req.body.author
          const comment = req.body.comment

          if (candidate.comments === null) {
            candidate.comments = []
          }

          console.log(candidate.comments)

          candidate.comments.push({
            author,
            comment,
          })

          candidate.update({comments: candidate.comments})
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

  like (req, res) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate === null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          candidate.votes.push({
            author: req.body.author,
            points: 1,
          })

          candidate.update({votes: candidate.votes})
            .then((candidate) => {
              if (candidatesHelper.checkPoints(candidate, minPoints)) {
                candidatesHelper.moveToNextBlock(candidate, models)
              }

              res.json({
                error: false,
                candidate
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

  superLike (req, res) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate === null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          candidate.votes.push({
            author: req.body.author,
            points: 5,
          })

          candidate.update({votes: candidate.votes})
            .then((candidate) => {
              candidatesHelper.checkPoints(candidate)

              res.json({
                error: false,
                candidate
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

  getPoints (req, res) {
    models.Candidates.findById(req.params.id)
      .then((candidate) => {
        if (candidate === null) {
          res.json({
            error: true,
            message: `Candidate ${req.params.id} not found`,
          })
        } else {
          const points = candidatesHelper.getPoints(candidate)

          res.json({
            error: false,
            points: points,
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

  setup (req, res) {
    if (req.body.min_points !== undefined) {
      minPoints = req.body.min_points
    }

    models.Setup.findById(1)
      .then((setup) => {
        setup.min_points = minPoints

        setup.save()
          .then((setup) => {
            res.json({
              error: false,
              message: req.body,
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

module.exports = CandidatesController
