const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.indexMessages = (req, res) => {
    Message.find()
        .sort([['timestamp', 'ascending']])
        .populate('author')
        .exec((err, messages) => {
            if (err) return next(err);
            res.render('index', { title: 'Members Only', messages });
        });
};

exports.createMessageGet = (req, res) => {
    res.render('create-message', { title: 'Create a Message' });
};

exports.createMessagePost = [
    body('title', 'Title must be specified')
        .trim()
        .isLength({ max: 40 })
        .escape(),
    body('text', 'Message text must be specified').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.title,
            text: req.body.text,
            timestamp: new Date(),
            author: req.user.id,
        });

        if (!errors.isEmpty()) {
            res.render('create-message', {
                title: 'Create a Message',
                errors: errors.array(),
            });
            return;
        } else {
            message.save((err) => {
                if (err) return next(err);

                res.redirect('/');
            });
        }
    },
];

exports.deleteMessage = (req, res) => {
    Message.findByIdAndRemove(req.body.messageId, (err) => {
        if (err) return next(err);

        res.redirect('/');
    });
};
