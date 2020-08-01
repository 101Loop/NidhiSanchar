import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/app_bar";
// import AuthenticatedView from "./views/AuthenticatedView";
// import { isAuthenticated } from "./services/auth";
import LandingPage from "./views/LandingPage";
// import Signin from "./views/Signin";
// import ForgotPassword from "./views/ForgotPasswordForm";

function App() {
  return (
    <div className="App">
      <div>
        <AppBar />

        <LandingPage />
      </div>
    </div>
  );
}

export default App;
