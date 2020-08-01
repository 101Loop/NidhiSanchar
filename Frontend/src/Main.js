import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoutes";
import Signin from "./views/Signin";
import { createBrowserHistory } from "history";
import SchemeView from "./views/Schemes/SchemeView";
import Contact from "./views/contact";


const history = createBrowserHistory();

const Main = () => {
    return (
        <div>
            <Switch history={history}>
                <Route path="/signin" component={Signin} />{" "}
                <PrivateRoute path="/contact" component={Contact} />{" "}
                <Route path="/schemes" component={SchemeView} />
            </Switch>{" "}
        </div>
    );
};

export default Main;
