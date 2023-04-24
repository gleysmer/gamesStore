const express = require('express');
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const fileUpload = require('express-fileupload')
// const helmet = require('helmet');
require('./db.js');
const cors = require('cors')

const passport = require("passport");
const authRoute = require("./routes/auth");
const server = express();
require("../passport.js")

server.name = 'API';
server.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));


server.use("/auth", authRoute);
server.use('/', routes);

// server.use(express.static('public'));

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// server.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "node_modules/", "localhost:3001"],
//     // defaultSrc: ["'*'", "http://localhost:3001"]
//   }
// }));

module.exports = server;
