import React, { useState, useEffect } from 'react';
import { Redirect, Route } from "react-router-dom";
import jwt_token from 'jwt-decode';

function PrivateRoute(props) {
    const [isAuth, setAuth] = useState(true);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            if (localStorage.getItem('token')) {
                let decoded = jwt_token(localStorage.getItem('token'));
                if (Date.now() >= decoded.exp*1000){
                    setLoading(false);
                    setAuth(null);
                }
                else{
                    setLoading(false);
                    setAuth("Authorised");
                }
            }
            else {
                setLoading(false);
                setAuth(null);
            }

        }

        fetchData();
    }, [])
    return (isLoading ? null :
        isAuth ?
            <Route path={props.path} component={props.component} exact={props.exact} /> :
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )

}

export default PrivateRoute;