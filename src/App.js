import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import postCreate from './Containers/postCreate';
import postList from './Containers/postList';
import Header from './Containers/Header';
import MyPosts from './Containers/MyPosts';
import SignUp from './Containers/Auth/Signup';
import Login from './Containers/Auth/Login';
import * as actions from './Store/Actions/index';
import Logout from './Containers/Auth/Logout';
import './App.css';

Axios.defaults.baseURL = 'http://localhost:5050/';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact={true} component={postList} />
        <Route path="/posts" component={postList} />
        <Route path='/signup' component={SignUp} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact={true} component={postList} />
          <Route path="/create" component={postCreate} />
          <Route path="/posts" component={postList} />
          <Route path="/my-posts" component={MyPosts} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/posts" />
        </Switch>
      )
    }
    return (
      <BrowserRouter>
        <Header auth={this.props.isAuthenticated} />
        {routes}
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  token: state.auth.token
})
const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authStateCheck())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);