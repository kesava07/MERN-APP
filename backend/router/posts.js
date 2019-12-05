const express = require('express');
const postRouter = express.Router();
const authCheck = require('../middleware/auth-check')
const PostsModel = require('../models/posts');


postRouter.get("", (req, res) => {
    const postQuery = PostsModel.find();
    let fetchedDocs;
    postQuery.then(docs => {
        fetchedDocs = docs;
        return PostsModel.count();
    }).then((count) => {
        res.status(200).json({
            message: "Posts fetched successfully",
            posts: fetchedDocs,
            postsCount: count
        })
    }).catch(() => {
        res.status(500)
            .json({
                message: "Fetching posts failed"
            })
    })
});

postRouter.post("", authCheck, (req, res) => {
    const NewPost = new PostsModel({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userName,
        creatorId: req.userData.userId,
        date: new Date().toISOString()
    });
    NewPost.save()
        .then(result => {
            res.status(201).json({
                message: "Post created successfully",
                post: result
            })
        })
});

postRouter.delete("/:id", authCheck, (req, res) => {
    PostsModel.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: "Post deleted successfully",
                post: result
            })
        })
        .catch(() => {
            res.status(400).json({
                message: "Failed to delete"
            })
        })
})

module.exports = postRouter;