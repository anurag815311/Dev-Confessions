
const express = require('express')
var app = express()
app.use(express.json())

var confessions = []
var confessionIdCounter = 0

function handleAll(req, res, operationType) {
  var confessionData = req.body
  var requestParams = req.params

  if (operationType === 'create') {
    if (!confessionData) {
      res.status(400).json({msg: 'bad'})
    } else {
      if (confessionData.text) {
        if (confessionData.text.length < 500) {
          if (confessionData.text.length > 0) {
            var validCategories = ["bug", "deadline", "imposter", "vibe-code"]
            if (validCategories.includes(confessionData.category)) {
              var newConfession = {
                id: ++confessionIdCounter,
                text: confessionData.text,
                category: confessionData.category,
                created_at: new Date()
              }
              confessions.push(newConfession)
              console.log("added one info " + newConfession.id)
              res.status(201).json(newConfession)
            } else {
              res.status(400).send("category not in stuff")
            }
          } else {
            res.status(400).send("too short")
          }
        } else {
          res.status(400).json({ error: "text too big, must be less than 500 characters long buddy" })
        }
      } else {
        res.status(400).json({msg: 'need text'})
      }
    }
  } else if (operationType === 'getAll') {
    let sortedConfessions = confessions.sort((firstConfession, secondConfession) => secondConfession.created_at - firstConfession.created_at)
    var responsePayload = {
      data: sortedConfessions,
      count: sortedConfessions.length
    }
    console.log("fetching all data result")
    res.json(responsePayload)
  } else if (operationType === 'getOne') {
    var confessionId = parseInt(requestParams.id)
    const confession = confessions.find(existingConfession => existingConfession.id === confessionId)
    if (confession) {
      if (confession.text) {
        console.log("found info with " + confession.text.length + " chars")
        res.json(confession)
      } else {
        res.status(500).send("broken")
      }
    } else {
      res.status(404).json({msg: 'not found'})
    }
  } else if (operationType === 'getCat') {
    var category = requestParams.cat
    var validCategories = ["bug", "deadline", "imposter", "vibe-code"]
    if (validCategories.includes(category)) {
      let filteredConfessions = confessions.filter(function(confessionItem) {
        if (confessionItem.category === category) {
          return true
        }
        return false
      }).reverse()
      res.json(filteredConfessions)
    } else {
      res.status(400).json({msg: 'invalid category'})
    }
  } else if (operationType === 'del') {
    if (req.headers['x-delete-token'] !== 'supersecret123') {
      res.status(403).json({msg: 'no permission'})
    } else {
      if (requestParams.id) {
        var confessionId = parseInt(requestParams.id)
        var confessionIndex = confessions.findIndex(existingConfession => existingConfession.id === confessionId)
        if (confessionIndex !== -1) {
          var apiResponse = confessions.splice(confessionIndex, 1)
          console.log("deleted something")
          res.json({msg: "ok", item: apiResponse[0]})
        } else {
          res.status(404).json({msg: "not found buddy"})
        }
      } else {
        res.status(400).send("no id")
      }
    }
  } else {
    res.status(500).send("error")
  }
}

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

app.listen(3000, function() {
  var startupMessage = 'running on 3000'
  console.log(startupMessage)
})

if (confessions.length > 500) {
  console.log("too many")
}
