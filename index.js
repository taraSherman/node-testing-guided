const express = require("express")
const hobbitsModel = require("./hobbits/hobbits-model")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  })
})

server.get("/hobbits", async (req, res, next) => {
  try {
    const hobbits = await hobbitsModel.getAll()
    res.status(200).json(hobbits)
  } catch (err) {
    next(err)
  }
})

server.use((err, req, res, next) => {
  console.log("Error:", err)
  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(port, () => {
  console.log(`\n=> Server up at http://localhost:${port}\n`)
})
