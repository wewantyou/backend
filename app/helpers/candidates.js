'use strict'

function getPoints (candidate) {
  return candidate.votes.reduce((total, vote) => {
    return total + parseInt(vote.points)
  }, 0)
}

function checkPoints (candidate, minPoints) {
  const points = checkPoints(candidate)

  if (points >= minPoints) {
    return true
  }

  return false
}

function moveToNextBlock (candidate, models) {
  models.Flows.findById(candidate.flow)
    .then((flow) => {
      const currentBlock = candidate.block

      let nextBlock
      if (currentBlock === -1) {
        nextBlock = flow.order[0]
      } else {
        nextBlock = flow.order.indexOf(currentBlock) + 1
      }

      candidate.block = nextBlock
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
