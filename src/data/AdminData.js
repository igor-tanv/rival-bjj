const Player = require('../models/player')

const updatePlayerRankById = async (playerId, result) => {
  return await Player.findOneAndUpdate({ _id: playerId }, result, { new: true })
}

const updatePlayerById = async (playerId, updates) => {
  return await Player.findOneAndUpdate({ _id: playerId }, updates, { new: true })
}

module.exports = {
  updatePlayerRankById,
  updatePlayerById
}