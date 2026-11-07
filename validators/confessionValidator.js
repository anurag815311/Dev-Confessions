const { VALID_CATEGORIES } = require('../config/config');

function validateCreateConfession(confessionData) {
  if (!confessionData) {
    return {
      error: 'bad',
      statusCode: 400,
      responseType: 'json'
    };
  }

  if (typeof confessionData.text !== 'string' || !confessionData.text) {
    return {
      error: 'need text',
      statusCode: 400,
      responseType: 'json'
    };
  }

  if (confessionData.text.length >= 500) {
    return {
      error: 'text too big, must be less than 500 characters long buddy',
      statusCode: 400,
      responseType: 'json'
    };
  }

  if (!VALID_CATEGORIES.includes(confessionData.category)) {
    return {
      error: 'category not in stuff',
      statusCode: 400,
      responseType: 'send'
    };
  }

  return null;
}

function validateCategory(category) {
  return VALID_CATEGORIES.includes(category);
}

module.exports = {
  validateCreateConfession,
  validateCategory
};