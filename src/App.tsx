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
import Poopfeed from "./Pages/Poopfeed";
import SignUp from "./Components/SigningInOut/Signup";
import Background from "./Components/Fixed/background";
import About from "./Pages/About";
import ComPoop from "./Pages/Compoop";
// import ProfileCard from "./Components/ProfileCardpossiblyunused";
// import ProfilePage from "./Components/GetProfile";
import TestUI from "./Pages/TestUI";
import CreatePost from "./Components/Posting/CreatePost";
import ProfilePicProvider from "./Components/Fixed/ProfilePicProvider";
import ProfilePage from "./Pages/ProfilePage";
import GetProfile from "./Components/Profiles/GetProfile";
import Friends from "./Components/Social/Friends";
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
              <PrivateRoute path="/compoop" component={ComPoop} />
              <PrivateRoute path="/create" component={CreatePost} />
              <PrivateRoute path="/poopfeed" component={Poopfeed} />
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
