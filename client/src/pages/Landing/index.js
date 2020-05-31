import React from "react";
import "./landing.scss";

/**
 * Landing page for Saree Storage
 */
function LandingPage(props) {
    return (
        <div id="landingOuter">
            <div className="boundingTextBox">
                <p>Welcome to </p>
                <h1 className="landingMessage">Geetha's</h1>
                <p>Saree collections </p>
                <button id="login" className="btn btn-outline-primary my-2 my-sm-0" onClick={() => props.history.push("/login")}>Log In</button>
            </div>
        </div>
    );
}
export default LandingPage;
