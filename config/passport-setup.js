const passport = require('passport');
const GoogleStratege = require('passport-google-oauth20');
const keys = require('./keys');
const workingDb = require('../services/workingDb');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    workingDb.getById('users', id)
        .then(users => done(null, users[0]))
        .catch(err => done(err));
});

passport.use(
    new GoogleStratege({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, async (accessToken, refreshToken, profile, done) => {
        // console.log(profile);
        try {
            const users = await workingDb.db.from('users').where('googleId', '=', profile.id);
            if (users.length) {
                // console.log('already user: ', users[0]);
                done(null, users[0]);
            } else {
                const newUsersId = await workingDb.insertData('users', {
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture
                });
                // console.log('new User created id: ', newUsersId[0]);
                const newUsers = await workingDb.getById('users', newUsersId[0]);
                // console.log('new user: ', newUsers[0]);
                done(null, newUsers[0]);
            }

        } catch (err) {
            // console.error(err);
        }
    })
)