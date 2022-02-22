const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
