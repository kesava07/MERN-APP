import React, { Component } from 'react';
import moment from 'moment';
import Axios from 'axios';

export default class postList extends Component {
    state = {
        posts: [],
        loading: false,
        error: null
    }
    componentDidMount() {
        this.setState({ loading: true })
        Axios.get("v1/posts")
            .then(result => {
                this.setState({ posts: result.data.posts, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false, error: err })
            })
    }
    displayPosts = postsData => postsData && postsData.map((post) => (
        <div className="col-lg-4 col-sm-6 mb-3" key={post._id}>
            <div className="card card-body shadow-sm">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div>
                    <small className="float-left text-primary">{post.creator}</small>
                    <small className="float-right text-secondary">
                        {moment(post.date).fromNow()}
                    </small>
                </div>
            </div>
        </div>
    ))
    render() {
        const { posts, loading } = this.state;
        return (
            <div className="container-fluid posts_list_cmp">
                <p className="text-center mt-4">Posts</p>
                {
                    (posts.length === 0 && !loading) && (
                        <p className="text-center text-danger">
                            No posts found
                        </p>
                    )
                }
                <div className="row">
                    {loading && (
                        <div className="col-lg-12 text-center">
                            <div className="spinner-border text-primary"></div>
                        </div>
                    )}
                    {this.displayPosts(posts)}
                </div>
            </div>
        )
    }
}
