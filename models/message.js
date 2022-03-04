const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const MessageSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, maxlength: 40 },
    timestamp: { type: Date, required: true },
    text: { type: String, required: true },
});

MessageSchema.virtual('formattedTimestamp').get(function () {
    const date = DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.DATE_MED
    );
    const time = DateTime.fromJSDate(this.timestamp).toLocaleString(
        DateTime.TIME_SIMPLE
    );
    return `${date} at ${time}`;
});

module.exports = mongoose.model('Message', MessageSchema);
