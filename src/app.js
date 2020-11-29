const express = require('express')

require('./db/mongoose')
const apiJsonRouter = require('./routers/api/index')
const playerRouter = require('./routers/player')
const contractRouter = require('./routers/contract')

const adminRouter = require('./routers/admin')
const bodyParser = require('body-parser');
const hbs = require('express-handlebars')
const path = require('path')
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors')

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const layoutPath = path.join(__dirname, '../templates/layouts')

const app = express()
app.use(cors())
require('./routers/api/chat/index')(app)


// Passport Config
require('./middleware/passport')(passport);

//Setup handlebars engine and views location
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: layoutPath,
  partialsDir: partialsPath,
}));

app.set('view engine', 'hbs')
app.use(express.static('public'))
app.set('views', viewsPath)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(express.json())

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user
  next();
});

// flip the functionality - pass api to PlayerApi
app.use(apiJsonRouter.confirmationApi)
app.use(apiJsonRouter.playerApi)
app.use(apiJsonRouter.contractApi)
app.use(apiJsonRouter.sessionsApi)
app.use(playerRouter)
app.use(contractRouter)
app.use(adminRouter)


module.exports = app