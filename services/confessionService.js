
const { VALID_CATEGORIES } = require('../config/config')

let confessions = []
let confessionIdCounter = 0

function createConfession(confessionData) {
  if (!confessionData) {
    return { error: 'bad', statusCode: 400, responseType: 'json' }
  }

  if (!confessionData.text) {
    return { error: 'need text', statusCode: 400, responseType: 'json' }
  }

  if (confessionData.text.length >= 500) {
    return {
      error: 'text too big, must be less than 500 characters long buddy',
      statusCode: 400,
      responseType: 'json'
    }
  }

  if (confessionData.text.length <= 0) {
    return { error: 'too short', statusCode: 400, responseType: 'send' }
  }

  if (!VALID_CATEGORIES.includes(confessionData.category)) {
    return {
      error: 'category not in stuff',
      statusCode: 400,
      responseType: 'send'
    }
  }

  const newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  }

  confessions.push(newConfession)

  console.log("added one info " + newConfession.id)

  return newConfession
}

function getAllConfessions() {
  const sortedConfessions = confessions.sort(
    (firstConfession, secondConfession) =>
      secondConfession.created_at - firstConfession.created_at
  )

  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  }
}

function getConfessionById(confessionId) {
  return confessions.find(
    existingConfession => existingConfession.id === confessionId
  )
}

function getConfessionsByCategory(category) {
  if (!VALID_CATEGORIES.includes(category)) {
    return null
  }

  return confessions.filter(
    confessionItem => confessionItem.category === category
  ).reverse()
}

function deleteConfession(confessionId, deleteToken, expectedDeleteToken) {
  if (deleteToken !== expectedDeleteToken) {
    return { error: 'no permission', statusCode: 403 }
  }

  if (!confessionId) {
    return { error: 'no id', statusCode: 400, responseType: 'send' }
  }

  const parsedConfessionId = parseInt(confessionId)

  const confessionIndex = confessions.findIndex(
    existingConfession => existingConfession.id === parsedConfessionId
  )

  if (confessionIndex === -1) {
    return { error: 'not found buddy', statusCode: 404 }
  }

  const deletedConfessions = confessions.splice(confessionIndex, 1)

  console.log("deleted something")

  return {
    msg: "ok",
    item: deletedConfessions[0]
  }
}

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
}
