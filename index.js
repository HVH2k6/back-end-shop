const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 8000;
const route = require('./router/index.router');
const connect = require('./config/connect_db');
const methodOverride = require('method-override');
const cors = require('cors');
const flash = require("express-flash");
const session = require("express-session");
require('dotenv').config();

connect.connect();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({ 
  secret: "express-session-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
