
const confessionService = require('../services/confessionService')

function createConfession(req, res) {
  const result = confessionService.createConfession(req.body)

  if (result.error) {
    const errorResponse = result.responseType === 'send'
      ? res.status(result.statusCode).send(result.error)
      : res.status(result.statusCode).json(
          result.error === 'bad' || result.error === 'need text'
            ? { msg: result.error }
            : { error: result.error }
        )

    return errorResponse
  }

  return res.status(201).json(result)
}

function getAllConfessions(req, res) {
  const responsePayload = confessionService.getAllConfessions()
  console.log("fetching all data result")
  return res.json(responsePayload)
}

function getConfessionById(req, res) {
  const confessionId = parseInt(req.params.id)
  const confession = confessionService.getConfessionById(confessionId)

  if (!confession) {
    return res.status(404).json({ msg: 'not found' })
  }

  if (!confession.text) {
    return res.status(500).send("broken")
  }

  console.log("found info with " + confession.text.length + " chars")

  return res.json(confession)
}

function getConfessionsByCategory(req, res) {
  const filteredConfessions =
    confessionService.getConfessionsByCategory(req.params.cat)

  if (filteredConfessions === null) {
    return res.status(400).json({ msg: 'invalid category' })
  }

  return res.json(filteredConfessions)
}

function deleteConfession(req, res) {
  const result = confessionService.deleteConfession(
    req.params.id,
    req.headers['x-delete-token'],
    'supersecret123'
  )

  if (result.error) {
    return result.responseType === 'send'
      ? res.status(result.statusCode).send(result.error)
      : res.status(result.statusCode).json({ msg: result.error })
  }

  return res.json(result)
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
}
