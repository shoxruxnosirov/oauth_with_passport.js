const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user })
})

// auth logout
router.get('/logout', (req, res) => {
    // req.logout();
    // res.redirect('/');
    req.logout(function(err) {
        if (err) {
            // console.error(err);
            return next(err);
        }
        res.redirect('/');
    });
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
})

module.exports =router;