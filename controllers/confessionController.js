const { DELETE_TOKEN } = require('../config/config');
const confessionService = require('../services/confessionService');
const logger = require('../utils/logger');

function createConfession(req, res) {
  const result = confessionService.createConfession(req.body);

  if (result.error) {
    const errorResponse = result.responseType === 'send'
      ? res.status(result.statusCode).send(result.error)
      : res.status(result.statusCode).json(
          result.error === 'bad' || result.error === 'need text'
            ? { msg: result.error }
            : { error: result.error }
        );

    return errorResponse;
  }

  return res.status(201).json(result);
}

function getAllConfessions(req, res) {
  const responsePayload = confessionService.getAllConfessions();

  logger.info('Fetched all confessions');

  return res.json(responsePayload);
}

function getConfessionById(req, res) {
  const confessionId = parseInt(req.params.id);
  const confession = confessionService.getConfessionById(confessionId);

  if (!confession) {
    return res.status(404).json({ msg: 'not found' });
  }

  if (!confession.text) {
    logger.error(`Confession ${confessionId} has missing text`);
    return res.status(500).send('broken');
  }

  logger.info(
    `Fetched confession ${confessionId} with ${confession.text.length} characters`
  );

  return res.json(confession);
}

function getConfessionsByCategory(req, res) {
  const filteredConfessions =
    confessionService.getConfessionsByCategory(req.params.cat);

  if (filteredConfessions === null) {
    return res.status(400).json({ msg: 'invalid category' });
  }

  return res.json(filteredConfessions);
}

function deleteConfession(req, res) {
  const result = confessionService.deleteConfession(
    req.params.id,
    req.headers['x-delete-token'],
    DELETE_TOKEN
  );

  if (result.error) {
    return result.responseType === 'send'
      ? res.status(result.statusCode).send(result.error)
      : res.status(result.statusCode).json({ msg: result.error });
  }

  logger.info(`Deleted confession ${req.params.id}`);

  return res.json(result);
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
};