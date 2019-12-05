const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    creator: { type: String, required: true },
    date: { type: String, required: true },
    creatorId: { type: String, required: true }
});

module.exports = mongoose.model("Post", postsSchema);