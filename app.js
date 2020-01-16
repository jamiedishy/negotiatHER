const express = require('express')
const app = express()
const request = require("request");
const port = 2000

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"));

app.use(express.static("public"))

app.post("/", function(req, res) {
    res.sendFile(__dirname + "/portfolio.html")
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))