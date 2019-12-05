import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: []
    }
    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleLogin = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [] });
            this.props.loginUser(this.state.email, this.state.password);
        }
    }
    isFormValid = ({ email, password }) => {
        let errors = [];
        let error
        if (email.length > 0 && password.length > 0) {
            return true
        } else {
            error = { message: "Please enter valid email and password" }
            this.setState({ errors: errors.concat(error) })
        }
    }
    render() {
        const { email, password, errors } = this.state;
        const { loading, authError, redirect } = this.props;
        let redirectToPosts;
        if (redirect) {
            redirectToPosts = <Redirect to="/" />
        }
        return (
            <React.Fragment>
                {redirectToPosts}
                <div className="container">
                    <div className="row pt-5">

                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div className="card card-body py-3 mb-3">
                                <div className="text-center mb-3">
                                    {/* Image */}
                                </div>
                                <h4 className="text-center mb-4">Sign in to Chats Go</h4>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleLogin}>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="email">Email address:</label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="email"
                                                    name="email"
                                                    autoFocus
                                                    onChange={this.handleOnchange}
                                                    value={email}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="password">password:</label>
                                                <input
                                                    id="password"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="password"
                                                    name="password"
                                                    autoComplete=''
                                                    onChange={this.handleOnchange}
                                                    value={password}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button disabled={loading} className="btn btn-primary btn-block">{this.props.loading ? <span><span className="spinner-border spinner-border-sm"></span> signing in...</span> : "Login"}</button>
                                            </div>
                                        </form>
                                        {errors && errors.map((error, i) => <div key={i} className="alert alert-danger text-center mt-3">
                                            <small>{error.message}</small>
                                        </div>)}
                                        {authError && <small>{authError.message}</small>}
                                    </div>
                                </div>
                            </div>
                            <div className="card card-footer">
                                <span className="text-center small">New to Chats Go ? <Link to="signUp">Create an account</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    redirect: state.auth.redirect,
    authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    loginUser: (email, password) => dispatch(actions.handleLogin(email, password))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);