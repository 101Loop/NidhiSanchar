import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoutes";
import Signin from "./views/Signin";
import RaiseRequest from "./views/fund_req/fund_req1";
import Dashboard from "./views/Dashboard";
import { createBrowserHistory } from "history";
import SelectScheme from "./views/select_scheme/selectedScheme";
import SchemeCentral from "./views/Schemes/Scheme";
import SchemeView from "./views/Schemes/SchemeView";
import Contact from "./views/contact";
import Help from "./views/community";
import RequestView from "./views/fund_req/RequestView";
import SpecificHelp from "./views/help";
import SingleSchemeRequestsView from "./views/fund_req/SingleSchemeRequestsView";
import DiscussionSchemeTableContainer from "./views/discussions/DiscussionSchemeTableContainer.js";
import Discussions from "./views/discussions/DicussionsPage";
import ProfilePage from "./views/profile/ProfileView";
import ErrorPage from "./views/404";
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
        <PrivateRoute path="/myprofile" component={ProfilePage} />{" "}
        <PrivateRoute
          path="/discussions"
          component={DiscussionSchemeTableContainer}
        />
        <Route path="/schemes" component={SchemeView} />
        <Route path="/shelp/" component={SpecificHelp} />
        <Route path="/scheme-details/:slug" component={SchemeCentral} />{" "}
        <Route path="/edit-scheme/:slug" component={SelectScheme} />{" "}
        <Route path="/raise-request/:slug" component={RaiseRequest} />{" "}
        <Route
          path="/all-requests/:slug"
          component={SingleSchemeRequestsView}
        />{" "}
        <Route path="/discussion/:slug" component={Discussions} />{" "}
        <Route component={ErrorPage} />
      </Switch>{" "}
    </div>
  );
};

export default Main;
