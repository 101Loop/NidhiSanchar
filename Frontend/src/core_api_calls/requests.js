import axios from "axios";
import { API } from "../utils/consts";

export const getFundRequests = () => {
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  let URL = API.BASE_PATH + API.GET_FUND_REQUESTS;

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

export const createFundRequest = (data) => {
  console.log("data: ", data);
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  let URL = API.BASE_PATH + API.CREATE_FUND_REQUEST;
  return axios(`${URL}`, { method: "POST", data: data, headers: headers })
    .then((response) => {
      console.log("response: ", response);
      if (response.status > 300) {
        throw new Error("An error occured");
      }
      return response;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
}
