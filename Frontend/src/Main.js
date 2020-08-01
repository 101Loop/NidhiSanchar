import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./views/Signin";
import { createBrowserHistory } from "history";


const history = createBrowserHistory();

const Main = () => {
    return (
        <div>
            <Switch history={history}>
                <Route path="/signin" component={Signin} />{" "}
            </Switch>{" "}
        </div>
    );
};

export default Main;
