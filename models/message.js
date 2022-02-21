const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    timestamp: { type: Date, required: true },
    text: { type: String, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
