import React, { Component } from "react";
//import Dashboard from "./Dashboard";
import Main from "../Main";
import AuthenticatedAppBar from "../components/AuthenticatedAppBar";

class View extends Component {
    render() {
        return (
            <div>
                <AuthenticatedAppBar />
                <div id="view-area">
                    <Main />
                </div>
            </div>
        );
    }
}

export default View;
