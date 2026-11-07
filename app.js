
const express = require('express')
var app = express()

app.use(express.json())

var confessions = []
var confessionIdCounter = 0

// Creates a confession after validating the submitted data.
function createConfession(req, res) {
  var confessionData = req.body

  if (!confessionData) {
    return res.status(400).json({ msg: 'bad' })
  }

  if (!confessionData.text) {
    return res.status(400).json({ msg: 'need text' })
  }

  if (confessionData.text.length >= 500) {
    return res.status(400).json({
      error: "text too big, must be less than 500 characters long buddy"
    })
  }

  if (confessionData.text.length <= 0) {
    return res.status(400).send("too short")
  }

  var validCategories = ["bug", "deadline", "imposter", "vibe-code"]

  if (!validCategories.includes(confessionData.category)) {
    return res.status(400).send("category not in stuff")
  }

  var newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  }

  confessions.push(newConfession)

  console.log("added one info " + newConfession.id)

  return res.status(201).json(newConfession)
}

// Retrieves all confessions sorted by creation date.
function getAllConfessions(req, res) {
  var sortedConfessions = confessions.sort(
    (firstConfession, secondConfession) =>
      secondConfession.created_at - firstConfession.created_at
  )

  var responsePayload = {
    data: sortedConfessions,
    count: sortedConfessions.length
  }

  console.log("fetching all data result")

  return res.json(responsePayload)
}

// Finds and returns a confession using its ID.
function getConfessionById(req, res) {
  var requestParams = req.params
  var confessionId = parseInt(requestParams.id)

  const confession = confessions.find(
    existingConfession => existingConfession.id === confessionId
  )

  if (!confession) {
    return res.status(404).json({ msg: 'not found' })
  }

  if (!confession.text) {
    return res.status(500).send("broken")
  }

  console.log("found info with " + confession.text.length + " chars")

  return res.json(confession)
}

// Filters and returns confessions belonging to a valid category.
function getConfessionsByCategory(req, res) {
  var category = req.params.cat
  var validCategories = ["bug", "deadline", "imposter", "vibe-code"]

  if (!validCategories.includes(category)) {
    return res.status(400).json({ msg: 'invalid category' })
  }

  var filteredConfessions = confessions.filter(
    confessionItem => confessionItem.category === category
  ).reverse()

  return res.json(filteredConfessions)
}

// Checks authorization and deletes a confession using its ID.
function deleteConfession(req, res) {
  var requestParams = req.params

  if (req.headers['x-delete-token'] !== 'supersecret123') {
    return res.status(403).json({ msg: 'no permission' })
  }

  if (!requestParams.id) {
    return res.status(400).send("no id")
  }

  var confessionId = parseInt(requestParams.id)

  var confessionIndex = confessions.findIndex(
    existingConfession => existingConfession.id === confessionId
  )

  if (confessionIndex === -1) {
    return res.status(404).json({ msg: "not found buddy" })
  }

  var apiResponse = confessions.splice(confessionIndex, 1)

  console.log("deleted something")

  return res.json({ msg: "ok", item: apiResponse[0] })
}

// Dispatches each operation to its dedicated function.
function handleAll(req, res, operationType) {
  if (operationType === 'create') {
    return createConfession(req, res)
  }

  if (operationType === 'getAll') {
    return getAllConfessions(req, res)
  }

  if (operationType === 'getOne') {
    return getConfessionById(req, res)
  }

  if (operationType === 'getCat') {
    return getConfessionsByCategory(req, res)
  }

  if (operationType === 'del') {
    return deleteConfession(req, res)
  }

  return res.status(500).send("error")
}

// API routes
app.post('/api/v1/confessions', function(req, res) {
  handleAll(req, res, 'create')
})

app.get('/api/v1/confessions', (req, res) => {
  handleAll(req, res, 'getAll')
})

app.get('/api/v1/confessions/:id', function(req, res) {
  handleAll(req, res, 'getOne')
})

app.get('/api/v1/confessions/category/:cat', function(req, res) {
  if (req.params.cat) {
    handleAll(req, res, 'getCat')
  }
})

app.route('/api/v1/confessions/:id').delete(function(req, res) {
  handleAll(req, res, 'del')
})

// Starts the Express server.
app.listen(3000, function() {
  var startupMessage = 'running on 3000'
  console.log(startupMessage)
})

if (confessions.length > 500) {
  console.log("too many")
}
