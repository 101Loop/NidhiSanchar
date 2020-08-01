import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoutes";
import Signin from "./views/Signin";
import Dashboard from "./views/Dashboard";
import { createBrowserHistory } from "history";
import SchemeCentral from "./views/Schemes/Scheme";
import SchemeView from "./views/Schemes/SchemeView";
import Contact from "./views/contact";
import Help from "./views/community";
import SpecificHelp from "./views/help";

const history = createBrowserHistory();

const Main = () => {
  return (
    <div>
      <Switch history={history}>
        <Route path="/signin" component={Signin} />{" "}
        <PrivateRoute path="/contact" component={Contact} />{" "}
        <PrivateRoute path="/help" component={Help} />{" "}
        <PrivateRoute path="/dashboard" component={Dashboard} />{" "}
        <Route path="/schemes" component={SchemeView} />
        <Route path="/shelp/" component={SpecificHelp} />
        <Route path="/scheme-details/:slug" component={SchemeCentral} />{" "}
      </Switch>{" "}
    </div>
  );
};

export default Main;
