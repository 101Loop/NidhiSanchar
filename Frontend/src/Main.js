import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./views/Signin";
import { createBrowserHistory } from "history";
import SchemeView from "./views/Schemes/SchemeView";



const history = createBrowserHistory();

const Main = () => {
    return (
        <div>
            <Switch history={history}>
                <Route path="/signin" component={Signin} />{" "}
                <Route path="/schemes" component={SchemeView} />
            </Switch>{" "}
        </div>
    );
};

export default Main;
