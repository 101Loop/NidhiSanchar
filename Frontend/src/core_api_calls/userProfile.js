import axios from "axios";
import { API } from "../utils/consts";

export const getProfileInfo = () => {
    const key = localStorage.getItem("jwt");
    const headers = { Authorization: `Bearer ${key}` };
    let URL = API.BASE_PATH + API.GET_PROFILE_INFO;
    console.log("URL: ", URL);

    return axios(`${URL}`, { method: "GET", headers: headers })
        .then((response) => {
            console.log("RESPONSE: ", response);
            if (response.status > 300) {
                throw new Error("An error occured");
            }
            return response;
        })
        .catch((err) => {
            console.log("error: ", err);
        });
};