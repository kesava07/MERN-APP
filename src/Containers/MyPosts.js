import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

class MyPosts extends Component {
    state = {
        myPosts: [],
        loading: false
    }
    componentDidMount() {
        this.setState({ loading: true })
        Axios.get('/v1/posts')
            .then(result => {
                const myData = result.data.posts;
                const updatedData = [...myData].filter(post => post.creatorId === this.props.userData.id);
                this.setState({ myPosts: updatedData, loading: false });
            })
            .catch(err => {
                this.setState({ loading: false })
            });
    }

    deletePost = id => {
        Axios.delete(`/v1/posts/${id}`, { headers: { 'x-access-token': 'Bearer ' + this.props.token } })
            .then(res => {
                this.props.history.push('/posts');
            })
            .catch(err => {
                console.log(err);
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
                <hr />
                <div className="text-right">
                    <button className="btn btn-sm btn-primary">EDIT</button>
                    <button className="btn btn-sm btn-danger ml-2" onClick={() => this.deletePost(post._id)}>DELETE</button>
                </div>
            </div>
        </div>
    ))
    render() {
        const { loading, myPosts } = this.state;
        return (
            <div className="container-fluid posts_list_cmp">
                <p className="text-center mt-4">My Posts</p>
                {
                    (myPosts.length === 0 && !loading) && (
                        <p className="text-center text-danger">
                            No posts found
                        </p>
                    )
                }
                <div className="row">
                    {this.state.loading && (
                        <div className="col-lg-12 text-center">
                            <div className="spinner-border text-primary"></div>
                        </div>
                    )}
                    {this.displayPosts(this.state.myPosts)}

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userData: state.auth.userData,
    token: state.auth.token
})

export default connect(mapStateToProps)(MyPosts);