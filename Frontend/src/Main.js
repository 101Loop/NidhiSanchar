import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoutes";
import Signin from "./views/Signin";
import RaiseRequest from "./views/fund_req/fund_req";
import Dashboard from "./views/Dashboard";
import { createBrowserHistory } from "history";
import SelectScheme from "./views/select_scheme/selectedScheme";
import SchemeCentral from "./views/Schemes/Scheme";
import SchemeView from "./views/Schemes/SchemeView";
import Contact from "./views/contact";
import Help from "./views/community";
import RequestView from "./views/fund_req/RequestView";
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
                <PrivateRoute path="/request-list" component={RequestView} />{" "}
                <Route path="/schemes" component={SchemeView} />
                <Route path="/shelp/" component={SpecificHelp} />
                <Route path="/scheme-details/:slug" component={SchemeCentral} />{" "}
                <Route path="/edit-scheme/:slug" component={SelectScheme} />{" "}
                <Route path="/raise-req" component={RaiseRequest} />{" "}
            </Switch>{" "}
        </div>
    );
};

export default Main;
