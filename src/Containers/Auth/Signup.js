import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';

class SignUp extends Component {
    state = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    handleOnchange = e => this.setState({ [e.target.name]: e.target.value });

    handleSignUp = e => {
        e.preventDefault();
        if (this.isFormValid()) {
            const { userName, email, password } = this.state;
            this.setState({ errors: [], loading: true });
            this.props.signupUser(userName, email, password);
        }
    };

    isFormValid = () => {
        let errors = [];
        let error;
        if (this.isFormEmpty(this.state)) {
            error = { message: "please fill all the details" }
            this.setState({ errors: errors.concat(error) })
            return false;
        }
        else if (!this.ispasswordValid(this.state)) {
            error = { message: "please check the password" };
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else {
            return true;
        }
    };

    isFormEmpty = ({ userName, email, password, confirmPassword }) => {
        return !userName.length || !email.length || !password.length || !confirmPassword.length
    }
    ispasswordValid = ({ password, confirmPassword }) => {
        if (password.length < 6 || confirmPassword.length < 6) {
            return false;
        } else if (password !== confirmPassword) {
            return false
        } else {
            return true;
        }
    }

    componentWillUnmount() {
        this.props.resetRedirect();
    }

    render() {
        const { userName, email, password, confirmPassword, errors } = this.state;
        const { loading, redirect, authError } = this.props;
        let redirectToLogin;
        if (redirect) {
            redirectToLogin = <Redirect to="/login" />
        }
        return (
            <React.Fragment>
                {redirectToLogin}
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-lg-4"></div>
                        <div className="col-lg-4">
                            <div className="card card-body py-3 mb-3">
                                <div className="text-center mb-3">
                                    {/* Image */}
                                </div>
                                <h3 className="text-center mb-4">Sign up to Posts</h3>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleSignUp}>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="userName">User name:</label>
                                                <input
                                                    id="userName"
                                                    type="text"
                                                    autoFocus
                                                    className="form-control"
                                                    placeholder="Username"
                                                    name="userName"
                                                    onChange={this.handleOnchange}
                                                    value={userName}
                                                />

                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="email">Email address:</label>

                                                <input
                                                    type="email"
                                                    id="email"
                                                    className="form-control"
                                                    placeholder="email"
                                                    name="email"
                                                    onChange={this.handleOnchange}
                                                    value={email}
                                                />
                                            </div>
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="password">Password:</label>

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
                                            <div className="form-group mb-3">
                                                <label className="font-weight-bold small" htmlFor="confirmPassword">Confirm password:</label>
                                                <input
                                                    id="confirmPassword"
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="confirm password"
                                                    autoComplete=''
                                                    name="confirmPassword"
                                                    onChange={this.handleOnchange}
                                                    value={confirmPassword}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <button disabled={loading} className="btn btn-primary btn-block">{this.props.loading ? <span><span className="spinner-border spinner-border-sm"></span> signing up...</span> : "SignUp"}</button>
                                            </div>
                                            {errors && errors.map((error, i) => <div key={i} className="alert alert-danger text-center mt-3">
                                                <small>{error.message}</small>
                                            </div>)}
                                            {authError && <p>{authError.message}</p>}
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="card card-footer">
                                <span className="text-center small">Have an account ? <Link to="/login">Login</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    };
};
const mapStateToProps = state => ({
    loading: state.auth.loading,
    redirect: state.auth.redirect,
    authError: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    signupUser: (name, email, password) => dispatch(actions.handleSignup(name, email, password)),
    resetRedirect: () => dispatch(actions.clearRedirect())
})
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);