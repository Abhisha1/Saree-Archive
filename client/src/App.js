import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import PrivateRoute from "./components/protectedRoutes";
import Home from "./pages/Home";
import Add from "./pages/Add";
import View from './pages/View';
import Edit from './pages/Edit';
import Discover from "./pages/Discover";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <NavBar /> */}
          <Route path="/" exact={true} component={LandingPage} />
          <Route path="/login" exact={true} component={Login}/>
          <PrivateRoute path="/home" component={Home} exact={true}></PrivateRoute>
        <PrivateRoute path="/add" component={Add} exact={true} /> 
        <PrivateRoute path="/view" component={View} exact={true} />
        <PrivateRoute path="/edit/:id" component={Edit} exact={true} />
        <PrivateRoute path="/discover" component={Discover} exact={true} />
        
       </div>
    </Router>
  );
}

export default App;
