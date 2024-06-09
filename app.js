const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
// const cookieSession = require('cookie-session');
const session = require('express-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

// set up view engine
app.set('view engine', 'ejs');

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.session.cookieKey]
// }));

app.use(session({
    secret: keys.session.cookieKey, // maxfiy kalitni ishlatish
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // cookie muddatini o'rnatish
}));
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// set up routes
app.use('/auth', authRoutes);


app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user })
})

app.listen(3000, () => console.log('app now listening for request on port 3000'));