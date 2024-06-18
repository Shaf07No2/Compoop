// import React, { useState } from "react";
import "./App.css";
import NavBar from "./Components/Fixed/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PrivateRoute from "./Components/Security/privateRoute";
import LogIn from "./Components/SigningInOut/LogIn";
import AuthContextProvider from "./Components/Security/AuthContext";
import Feed from "./Pages/Feed";
import SignUp from "./Components/SigningInOut/Signup";
import Background from "./Components/Fixed/background";

import FakeInsta from "./Pages/Compoop";

import TestUI from "./Pages/TestUI";
import CreatePost from "./Components/Posting/CreatePost";
import ProfilePicProvider from "./Components/Fixed/ProfilePicProvider";

import GetProfile from "./Components/Profiles/GetProfile";

import FriendPage from "./Pages/FriendPage";

function App() {
  return (
    <>
      <AuthContextProvider>
        <ProfilePicProvider>
          <BrowserRouter>
            <NavBar />
            <Background />
            {/* <TestUI /> */}

            <Switch>
              <PrivateRoute path="/home" component={Home} />
              <PrivateRoute path="/fakeinsta" component={FakeInsta} />
              <PrivateRoute path="/create" component={CreatePost} />
              <PrivateRoute path="/feed" component={Feed} />
              <PrivateRoute path="/register" component={SignUp} />
              <PrivateRoute path="/profile/:userId" component={GetProfile} />
              <PrivateRoute path="/friends" component={FriendPage} />

              <Route path="/login" component={LogIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/testui" component={TestUI} />

              <Redirect from="/" to="/Login" />
            </Switch>
          </BrowserRouter>
        </ProfilePicProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
