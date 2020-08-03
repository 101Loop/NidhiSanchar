import axios from "axios";
import { API } from "../utils/consts";

export const getCentreDashboardBoxInfo = () => {
    const URL = API.BASE_PATH + API.GET_CENTRE_DASHBOARD_BOX_INFO;
    const key = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${key}` };
    return axios(`${URL}`, { method: "GET", headers: headers })
        .then((response) => {
            if (response.status > 300) {
                throw new Error("An error occured");
            }
            return response;
        })
        .catch((err) => {
            console.log("error: ", err);
        });
};

export const getStateDashboardBoxInfo = () => {
    const URL = API.BASE_PATH + API.GET_STATE_DASHBOARD_BOX_INFO;
    const key = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${key}` };
    return axios(`${URL}`, { method: "GET", headers: headers })
        .then((response) => {
            if (response.status > 300) {
                throw new Error("An error occured");
            }
            return response;
        })
        .catch((err) => {
            console.log("error: ", err);
        });
};