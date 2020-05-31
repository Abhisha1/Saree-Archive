import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import PrivateRoute from "./components/protectedRoutes";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={LandingPage} />
        {/* <PrivateRoute path="/home" component={Home} exact={true} />
        <PrivateRoute path="/add" component={Home} exact={true} />
        <PrivateRoute path="/view" component={Home} exact={true} />
        <PrivateRoute path="/discover" component={Home} exact={true} />
        <Route path="/user" component={Home} exact={true} /> */}
        <Route path="/login" component={Login} exact={true} />
       </div>
    </Router>
  );
}

export default App;
