import React, { useState, useEffect } from 'react';
import { Redirect, Route } from "react-router-dom";


function PrivateRoute(props) {
    const [isAuth, setAuth] = useState(true);
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
    return (isLoading ? null :
        isAuth ?
            <Route path={props.path} component={props.component} exact={props.exact} /> :
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )

}

export default PrivateRoute;