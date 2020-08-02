import axios from "axios";
import createBrowserHistory from "history/createBrowserHistory";
import { API } from "../utils/consts";

const history = createBrowserHistory({ forceRefresh: true });

export const login = (e, data) => {
    e.preventDefault();
    const URL = API.BASE_PATH + API.LOGIN;
    console.log("URL: ", URL);
    console.log("BASE PATH: ", API.BASE_PATH);
    axios(`${URL}`, {
        method: "POST",
        data: data,
    })
        .then((response) => {
            if (response.status >= 300) {
                throw new Error("An error occured!");
            }
            localStorage.setItem("jwt", response.data.token);
            const key = localStorage.getItem("jwt");
            console.log("key: ", key);

            if (isAuthenticated()) {
                history.push("/dashboard");
            }
            return response;
        })
        .catch((err) => {
            alert("Username/Password is incorrect");
            console.log("error: ", err);
        });
};

export const getUserInfo = () => {
    const URL = API.BASE_PATH + API.GET_USER_INFO;
    const key = localStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${key}`,
    };
    return axios(`${URL}`, {
        method: "GET",
        headers: headers,
    })
        .then((response) => {
            if (response.status >= 300) {
                throw new Error("An error occured");
            } else {
                if (response.data.is_centre_user) {
                    localStorage.setItem("userOf", "centre");
                } else {
                    localStorage.setItem("userOf", "state");
                }
            }
        })
        .catch((err) => {
            console.log("error: ", err);
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    const URL = API.BASE_PATH + API.LOGOUT;
    const key = localStorage.getItem("jwt");
    const headers = {
        Authorization: `Bearer ${key}`,
    };
    if (typeof window !== "undefined") {
        next();
        return axios(`${URL}`, {
            method: "GET",
            headers: headers,
        })
            .then((response) => {
                console.log("response: ", response);
                if (response.status >= 300) {
                    throw new Error("An error occured!");
                } else {
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("userOf");
                    history.push("/");
                    console.log("Signout success");
                }
            })
            .catch((err) => console.log("error: ", err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return localStorage.getItem("jwt");
    } else {
        return false;
    }
};
