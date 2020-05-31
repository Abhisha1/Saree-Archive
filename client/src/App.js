import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import PrivateRoute from "./components/protectedRoutes";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Add from "./pages/Add";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/home" component={Home} exact={true} />
        <PrivateRoute path="/add" component={Add} exact={true} />
        {/* <PrivateRoute path="/view" component={Home} exact={true} />
        <PrivateRoute path="/discover" component={Home} exact={true} />
        <Route path="/user" component={Home} exact={true} /> */}
        <Route path="/login" exact component={Login}/>
       </div>
    </Router>
  );
}

export default App;
