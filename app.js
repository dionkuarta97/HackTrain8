const express = require('express')
const app = express()
const port = 3000
const route = require("./routes")

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}));

app.use(route)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 