import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SignOut from '../Signout';
import './navbar.scss';
import logo from "../../assets/logo1.png";


function Navbar() {
    const [isAuth, setAuth] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [close, setClose] = useState(false)
    const [curr, setCurr] = useState(null);
    let location = useLocation().pathname;
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

    const toggle = () => {
        if(close){
            setClose(false);
        }
        else{
            setClose(true)
        }
    }

    return (
        <div>
            
            {isLoading ? null :
                isAuth ?
                <div>
                    <div id="customNavBar">
                    <div className="logoBox">
                        <div className={close ? "mobileNav" : "mobileNav hide"}>
                        <div className={close ? "container change" : "container"} onClick={toggle}>
                            <div className="bar1"></div>
                            <div className="bar2"></div>
                            <div className="bar3"></div>
                        </div>
                        <div className={close ? "sideBar show": "sideBar"}>
                            <Link id="linkToHome" to="/home">Home</Link>
                            <Link to="/add">Add  a saree</Link>
                            <Link id="linkToView" to="/view">View all</Link>
                            <Link id="linkToDiscover" to="/discover">Discover</Link>
                        </div>
                        </div>
                        <a href="/"  id="homepage-logo">
                            <img src={logo} id="logo-image" alt="Logo"></img>
                            </a>
                            </div>
                            <h1 className="navTitle"> Geetha's Saree Inventory</h1>
                            <SignOut></SignOut>
                    </div>
                    {<div className="authNav">
                <Link id="linkToHome" to="/home" className={location === "/home" ? "activeLink" : ""}>Home</Link>
                <Link to="/add" className={location === "/add" ? "activeLink" : ""}>Add  a saree</Link>
                <Link id="linkToView" to="/view" className={location === "/view" ? "activeLink" : ""}>View all</Link>
                <Link id="linkToDiscover" to="/discover" className={location === "/discover" ? "activeLink" : ""}>Discover</Link>
    </div>}
                    </div>
                    : <div></div>}



        </div>



    )
}

export default Navbar;