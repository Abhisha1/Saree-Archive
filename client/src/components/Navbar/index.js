import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../Signout';
import './navbar.scss';
import logo from "../../assets/logo1.png";

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

// const UnAuthNavBar = <ul className="navbar-nav mr-auto">
//     <li className="navbar-item">
//         <Link to="/user" className="btn btn-outline-primary my-2 my-sm-0">Create User</Link>
//     </li>
//     <li className="navbar-item">
//         <Link to="/login" className="btn btn-outline-primary my-2 my-sm-0">Log In</Link>
//     </li>

// </ul>

function Navbar() {
    const [isAuth, setAuth] = useState("");
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (!localStorage.getItem('token')) {
                setLoading(false);
                setAuth(null);
            }
            else {
                setLoading(false);
                setAuth("Authorised");
            }


        }

        fetchData();
    }, [])

    return (
        <div>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
       
            {isLoading ? null :
                isAuth ?
                    <nav id="customNavBar" className="navbar navbar-expand-lg navbar-light bg-light">
                        <a href="/" className="navbar-left" id="homepage-logo">
                            <img src={logo} id="logo-image" alt="Logo"></img>
                            </a>
                        <div className="collapse navbar-collapse">
                            {AuthNav}
                        </div>
                    </nav>
                    : <div></div>}



        </div>



    )
}

export default Navbar;