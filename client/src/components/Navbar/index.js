import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../Signout';
import './navbar.scss';

const AuthNav = 
<ul className="navbar-nav nav-fill w-100">
<ul className="navbar-nav nav-fill w-50">
    <li className="navbar-item">
        <Link id="linkToHome" to="/home" className="btn btn-outline-primary my-2 my-sm-0">Home</Link>
    </li>
    <li className="navbar-item">
        <Link to="/add" className="btn btn-outline-primary my-2 my-sm-0">Add  a saree</Link>
    </li>
    <li className="navbar-item">
        <Link id="linkToView" to="/view" className="btn btn-outline-primary my-2 my-sm-0">View all</Link>
    </li>
    <li className="navbar-item">
        <Link id="linkToDiscover" to="/discover" className="btn btn-outline-primary my-2 my-sm-0">Discover</Link>
    </li>
    </ul>
    <SignOut></SignOut>
</ul>

const UnAuthNavBar = <ul className="navbar-nav mr-auto">
    <li className="navbar-item">
    <Link to="/user" className="btn btn-outline-primary my-2 my-sm-0">Create User</Link>
    </li>
    <li className="navbar-item">
    <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0">Log In</Link>
    </li>

</ul>

function Navbar() {
    const [isAuth, setAuth] = useState("");
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (document.cookie){
                setLoading(false);
                setAuth("Authorised");
            }
            else {
                setLoading(false);
                setAuth(null);
            }


        }

        fetchData();
    }, [])

    return (
        <nav id="customNavBar" className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Geetha's Sarees</Link>
            <div className="collapse navbar-collapse">
                {isLoading ? null :
                    isAuth ? (AuthNav) : UnAuthNavBar}
            </div>
        </nav>


    )
}

export default Navbar;