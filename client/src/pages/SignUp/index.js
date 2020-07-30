import React, {useState} from 'react';
import axios from 'axios';

export default function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);

    const register = (event) => {
        event.preventDefault();
        axios.post("https://geethasaree.herokuapp.com/auth/signup", {email: email, password: password})
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            window.location.href = "/home";
        })
        .catch((err) => {
            console.log("err")
            setShowError(true)
        })
    }
    return(
        <div id="loginForm">
                <div id="boundingTextBox">
                    <h3 id="headingLogin">Sign Up</h3>
                    <form onSubmit={register}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email"
                                required
                                className="form-control"
                                value={email}
                                id="email"
                                onChange={(event => setEmail(event.target.value))}
                                placeholder="Email"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                required
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(event => setPassword(event.target.value))}
                                placeholder="Password"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Sign up" id="submit" className="btn btn-primary" />
                        </div>
                        {showError ?
                            <div id="error" className="alert alert-danger" role="alert" >
                                The email you entered is already in use
                    </div>
                            :
                            <div></div>}
                    </form>
                </div>
            </div>

    )
}