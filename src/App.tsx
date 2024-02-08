// import React, { useState } from "react";
import "./App.css";
import NavBar from "./Components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PrivateRoute from "./Components/privateRoute";
import LogIn from "./Components/LogIn";
import AuthContextProvider from "./Components/AuthContext";
import Poopfeed from "./Pages/Poopfeed";
import SignUp from "./Components/Signup";
import Background from "./Components/background";
import About from "./Pages/About";
import ComPoop from "./Pages/Compoop";
import ProfileCard from "./Components/ProfileCard";
import ProfilePage from "./Pages/ProfilePage";
import TestUI from "./Pages/TestUI";
import CreatePost from "./Components/CreatePost";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <NavBar />
          <Background />
          {/* <CreatePost /> */}
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/compoop" component={ComPoop} />
            <PrivateRoute path="/create" component={CreatePost} />
            <PrivateRoute path="/poopfeed" component={Poopfeed} />
            <PrivateRoute path="/register" component={SignUp} />
            <PrivateRoute path="/profile/:username" component={ProfileCard} />
            <PrivateRoute path="/profile" component={ProfilePage} />

            <Route path="/login" component={LogIn} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignUp} />
            <Route path="/testui" component={TestUI} />
            <Redirect from="/" to="/Login" />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
