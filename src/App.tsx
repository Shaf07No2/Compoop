import React, { useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PrivateRoute from "./Components/privateRoute";
import LogIn from "./Components/LogIn";
import { AuthContext } from "./Components/AuthContext";
import Oopsies from "./Pages/Oopsies";
import Poopfeed from "./Pages/Poopfeed";
import SignUp from "./Components/Signup";
import Background from "./Components/background";
import About from "./Pages/About";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        <BrowserRouter>
          <NavBar />
          <Background />
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/oopsies" component={Oopsies} />
            <PrivateRoute path="/poopfeed" component={Poopfeed} />
            <PrivateRoute path="/register" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/about" component={About} />
            <Redirect from="/" to="/home" />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
