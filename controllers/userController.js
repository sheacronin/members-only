const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.userSignUpGet = (req, res) => {
    res.render('sign-up', { title: 'Sign Up', errors: [] });
};

exports.userSignUpPost = [
    body('username', 'Username must be specified')
        .trim()
        .isLength({ min: 3, max: 30 })
        .escape(),
    body('firstName', 'First name must be specified').trim().escape(),
    body('lastName', 'Last name must be specified').trim().escape(),
    body('password', 'You must have a password'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates success of this synchronous custom validator
        return true;
    }),

    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            const errors = validationResult(req);

            const user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashedPassword,
                isMember: false,
            });

            if (!errors.isEmpty()) {
                res.render('sign-up', {
                    title: 'Sign Up',
                    errors: errors.array(),
                });
                return;
            } else {
                User.findOne({ username: user.username }).exec(
                    (err, foundUser) => {
                        if (err) return next(err);

                        if (foundUser) {
                            res.render('sign-up', {
                                title: 'Sign Up',
                                errors: [
                                    {
                                        msg: `Username ${user.username} is taken`,
                                    },
                                ],
                            });
                        } else {
                            user.save((err) => {
                                if (err) return next(err);

                                res.redirect('/');
                            });
                        }
                    }
                );
            }
        });
    },
];

passport.use(
    new LocalStrategy((username, password, done) => {
        console.log('local strategy');
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    // passwords match! user logs in
                    return done(null, user);
                } else {
                    // passwords do not match!
                    return done(null, false, { message: 'Incorrect password' });
                }
            });
        });
    })
);

passport.serializeUser(function (user, done) {
    console.log('serialize user');
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize user');
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

exports.logInGet = (req, res) => {
    res.render('log-in', { title: 'Log In' });
};

exports.logInPost = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
});

exports.joinClubGet = (req, res) => {
    res.render('join-club', { title: 'Join the Club' });
};

exports.joinClubPost = [
    body('passcode', 'Must enter a passcode')
        .trim()
        .escape()
        .custom((value, { req }) => {
            if (value.toLowerCase() !== process.env.SECRET_PASSCODE) {
                throw new Error('This is not the correct secret passcode');
            }

            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('join-club', {
                title: 'Join the Club',
                errors: errors.array(),
            });
            return;
        } else {
            console.log(req.user);
            User.findByIdAndUpdate(
                req.user._id,
                { isMember: true },
                {},
                (err, user) => {
                    if (err) return next(err);

                    res.redirect('/');
                }
            );
        }
    },
];
