import React from 'react';

function SignOut(){
    return (
        <form className="form-inline my-2 my-lg-0">
            <button id="signout" className="btn btn-outline-primary my-2 my-sm-0" onClick={() => localStorage.clear()}>Sign Out</button>
        </form>
    )
}

export default SignOut;
