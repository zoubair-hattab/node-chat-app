const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser');

/*-----------------------Import Routes Starts-------------------- */

const authRouters = require('./routes/auth.routes');
const homeRouters = require('./routes/home.routes');
const profileRouters = require('./routes/profile.routes');

/*-----------------------Import Routes Ends-------------------- */

dotenv.config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'assests')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash());

const STORE = new SessionStore({
  uri: process.env.URL_DB,
  collection: 'sessions',
});

app.use(
  session({
    secret: 'this is my secret secret to hash express sessions ......',
    saveUninitialized: false,
    store: STORE,
  })
);
app.use('/', authRouters);
app.use('/', homeRouters);
app.use('/profile', profileRouters);

app.get('/error', (req, res, next) => {
  res.status(500);
  res.render('error.ejs', {
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    pageTitle: 'Error',
  });
});

app.get('/not-admin', (req, res, next) => {
  res.status(403);
  res.render('not-admin', {
    isUser: req.session.userId,
    isAdmin: false,
    pageTitle: 'Not Allowed',
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.render('not-found', {
    auth: req.session.userId,
    isAdmin: req.session.isAdmin,
    pageTitle: 'Page Not Found',
  });
});
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
