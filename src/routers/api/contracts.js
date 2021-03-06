
const express = require('express')
const ContractService = require('../../services/contract')

const router = new express.Router()

router.get('/api/contracts', async (req, res) => {
  try {
    const contracts = await ContractService.getAllContractsByPlayerId(req.query.playerId)
    res.status(200).json({ contracts })
  } catch (error) {
    res.status(500).json({ error })
  }
})


router.post('/api/contracts', async (req, res) => {
  try {
    const contract = await ContractService.createContract(req.body)
    res.status(201).json({ contract })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/api/contracts/:id/accept', async (req, res) => {
  try {
    const contract = await ContractService.acceptContract(req.params.id)
    res.status(201).json({ contract })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/api/contracts/:id/decline', async (req, res) => {
  try {
    const contract = await ContractService.declineContract(req.params.id)
    res.status(201).json({ contract })
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/api/contracts/:id/cancel', async (req, res) => {
  try {
    const contract = await ContractService.cancelContract(req.params.id, req.body.playerId)
    res.status(201).json({ contract })
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router