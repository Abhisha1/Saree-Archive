import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import "./login.scss"

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.toggleAdmin = this.toggleAdmin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            showError: false,
            redirect: false,
            isAdmin: false
        }
    }

    toggleAdmin(e) {
        if (this.state.isAdmin) {
            this.setState({ isAdmin: false });
        }
        else {
            this.setState({ isAdmin: true });
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
            showError: false
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            showError: false
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        axios('https://geethasaree.herokuapp.com/auth/login', { method: "post", data: user })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                window.location.href = "/home";
            })
            .catch(err => {
                this.setState({
                    showError: true
                })
            });
    }


    render() {
        return (
            <div id="loginForm">
                <div id="boundingTextBox">
                    <h3 id="headingLogin">Login</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email"
                                required
                                className="form-control"
                                value={this.state.email}
                                id="email"
                                onChange={this.onChangeEmail}
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                required
                                id="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Log in" id="submit" className="btn btn-primary" />
                        </div>
                        {this.state.showError ?
                            <div id="error" className="alert alert-danger" role="alert" >
                                The details you entered are invalid, please try again
                    </div>
                            :
                            <div></div>}
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);