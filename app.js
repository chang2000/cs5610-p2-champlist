/*
 * Filename: /Users/alex/Developer/5610-p2/champListBack/app.js
 * Path: /Users/alex/Developer/5610-p2/champListBack
 * Created Date: Monday, October 20th 2022, 8:30:19 pm
 * Author: Tianchang WANG
 * 
 */

const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
const port = 5000

const db = require("./db.js")
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())
var indexRouter = require("./routes/index");
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
