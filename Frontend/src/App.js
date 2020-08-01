import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/app_bar";
import AuthenticatedView from "./views/AuthenticatedView";
import { isAuthenticated } from "./services/auth";
import LandingPage from "./views/LandingPage";
import Signin from "./views/Signin";

function App() {
  return (
    <div className="App">
      {isAuthenticated() && <AuthenticatedView />}
      {!isAuthenticated() && (
        <div>
          <AppBar />
          <div>
            <Switch>
              <Route path="/signin" component={Signin} />{" "}
              <Route path="/" component={LandingPage} />{" "}
            </Switch>{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
