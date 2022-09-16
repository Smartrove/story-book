const express = require("express");
const dotEnv = require("dotenv");
const morgan = require("morgan");
const { config, engine } = require("express-edge");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");

// const { engine } = require("express-handlebars");
const path = require("path");
const connectDB = require("./config/db");

//Load Config
dotEnv.config({ path: "./config/config.env" });
require("./config/passport")(passport);

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

//Init view Engine
app.use(engine);
app.set("views", `${__dirname}/views`);

//middleware body paser

app.use(bodyParser.urlencoded({ extended: true }));
//express session middleware

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(
  passport.session({
    secret: "keyboard cat",
    resave: false,
    saveUnInitialized: false,
  })
);

app.use(passport.initialize());

//middleware

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", "./views");

//static folder
app.use(express.static(path.join(__dirname, "public")));
//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

//Init morgan
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
