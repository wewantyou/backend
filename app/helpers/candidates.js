'use strict'

function getPoints (candidate) {
  return candidate.votes.reduce((total, vote) => {
    return total + parseInt(vote.points)
  }, 0)
}

function checkPoints (candidate, minPoints) {
  const points = getPoints(candidate)

  if (points >= minPoints) {
    return true
  }

  return false
}

function moveToNextBlock (candidate, models) {
  models.Flows.findById(candidate.flow)
    .then((flow) => {
      const currentBlock = candidate.BlockId

      let nextBlock
      if (currentBlock === 1) {
        // nextBlock = flow.order[0]
        nextBlock = 2
      } else {
        nextBlock = 2
        // nextBlock = flow.order.indexOf(currentBlock) + 1
      }

      candidate.BlockId = nextBlock
      candidate.save()
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = {
  getPoints,
  checkPoints,
  moveToNextBlock,
}
