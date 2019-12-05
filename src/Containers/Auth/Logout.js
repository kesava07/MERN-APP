import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions/index';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/" />
    }
};
const mapDispatchToprops = dispatch => ({
    onLogout: () => dispatch(actions.handleLogout())
})
export default connect(null, mapDispatchToprops)(Logout);