import axios from "axios";
import { API } from "../utils/consts";

export const getLandingPageBoxInfo = () => {
    const id = 1;
    const URL = API.BASE_PATH + API.GET_LANDING_PAGE_BOX_INFO + `${id}`;
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
