const {
  validateCreateConfession,
  validateCategory
} = require('../validators/confessionValidator');

const logger = require('../utils/logger');

let confessions = [];
let confessionIdCounter = 0;

function createConfession(confessionData) {
  const validationError = validateCreateConfession(confessionData);

  if (validationError) {
    return validationError;
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  };

  confessions.push(newConfession);

  logger.info(`Created confession ${newConfession.id}`);

  return newConfession;
}

function getAllConfessions() {
  const sortedConfessions = [...confessions].sort(
    (firstConfession, secondConfession) =>
      secondConfession.created_at - firstConfession.created_at
  );

  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  };
}

function getConfessionById(confessionId) {
  return confessions.find(
    existingConfession => existingConfession.id === confessionId
  );
}

function getConfessionsByCategory(category) {
  if (!validateCategory(category)) {
    return null;
  }

  return confessions
    .filter(confession => confession.category === category)
    .reverse();
}

function deleteConfession(confessionId, deleteToken, expectedDeleteToken) {
  if (deleteToken !== expectedDeleteToken) {
    return { error: 'no permission', statusCode: 403 };
  }

  if (!confessionId) {
    return {
      error: 'no id',
      statusCode: 400,
      responseType: 'send'
    };
  }

  const parsedConfessionId = parseInt(confessionId);

  const confessionIndex = confessions.findIndex(
    existingConfession => existingConfession.id === parsedConfessionId
  );

  if (confessionIndex === -1) {
    return { error: 'not found buddy', statusCode: 404 };
  }

  const [deletedConfession] = confessions.splice(confessionIndex, 1);

  logger.info(`Deleted confession ${deletedConfession.id}`);

  return {
    msg: 'ok',
    item: deletedConfession
  };
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
};