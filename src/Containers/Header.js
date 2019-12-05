import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-light navbar-light shadow">
                <ul className="navbar-nav">
                    {
                        this.props.auth && (
                            <React.Fragment>
                                <li className="nav-item active">
                                    <NavLink className="nav-link" to="/create">New Post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-posts">My Posts</NavLink>
                                </li>
                            </React.Fragment>
                        )
                    }
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/posts">All Posts</NavLink>
                    </li>

                </ul>

                <ul className="navbar-nav ml-auto" >
                    {
                        !this.props.auth ? (
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">Signup</NavLink>
                                </li>
                            </React.Fragment>
                        ) :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/logout">Logout</NavLink>
                            </li>
                    }
                </ul>
            </nav>
        )
    }
}
