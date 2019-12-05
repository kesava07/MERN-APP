import React, { Component } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';

class postCreate extends Component {
    state = {
        title: '',
        content: '',
        error: null
    };

    handleOnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const post = {
            title: this.state.title,
            content: this.state.content
        }
        this.setState({ loading: true });
        Axios.post("v1/posts", post, { headers: { 'x-access-token': 'Bearer ' + this.props.token } })
            .then(res => {
                this.setState({ loading: false });
                this.props.history.push('/posts');
            })
            .catch(err => {
                this.setState({ error: err, loading: false })
            })
    }
    render() {
        const { loading } = this.state;
        return (
            <div className="container">
                <div className="col-lg-5">
                    <div className="card card-body mt-4" >
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type='text'
                                    name="title"
                                    placeholder="Enter title"
                                    className="form-control"
                                    onChange={this.handleOnChange}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    type='text'
                                    name="content"
                                    placeholder="Enter content"
                                    className="form-control"
                                    onChange={this.handleOnChange}
                                ></textarea>
                            </div>
                            <button disabled={loading} className="btn btn-sm btn-primary" type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(postCreate);