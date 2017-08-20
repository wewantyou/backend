let models

class PoolController {
  constructor (projectModels) {
    models = projectModels
  }

  getPool (req, res) {
    models.Candidates.findAll({
      where: {
        // BlockId: 1,
      },
      order: [[
        'id', 'ASC'
      ]],
    })
      .then((candidates) => {
        res.json({
          error: false,
          candidates,
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

module.exports = PoolController
