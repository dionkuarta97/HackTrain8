const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes");
const flash = require("connect-flash");
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: { _expires: 10 * 60 * 1000 },
  })
);

app.use(flash());

app.use(route);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
