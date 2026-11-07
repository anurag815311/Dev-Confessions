
const app = require('./app')

const PORT = 3000

app.listen(PORT, function() {
  const startupMessage = `running on ${PORT}`
  console.log(startupMessage)
})
