import axios from "axios";

import { API } from "../utils/consts";

export const getSchemes = (pageNo) => {
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  let URL = API.BASE_PATH + API.GET_SCHEMES;
  if (pageNo) {
    URL += "?page=" + pageNo;
  }
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

export const getSchemeBySlug = (slug) => {
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  let URL = API.BASE_PATH + API.GET_SCHEME_BY_SLUG + `${slug}/`;

  return axios(`${URL}`, { method: "GET", headers: headers })
    .then((response) => {
      //console.log("RESPONSE: ", response);
      if (response.status > 300) {
        throw new Error("An error occured");
      }
      return response;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export const createScheme = (data) => {
  const URL = API.BASE_PATH + API.CREATE_SCHEME;
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };

  return axios(`${URL}`, { method: "POST", data: data, headers: headers })
    .then((response) => {
      if (response.status > 300) {
        throw new Error("An error occured");
      }
      return response.json();
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export const updateScheme = (slug, data) => {
  let URL = API.BASE_PATH + API.UPDATE_SCHEMES + `${slug}/`;
  const headers = { Authorization: `Bearer ${key}` };
  const key = localStorage.getItem("jwt");
  return axios(`${URL}`, { method: "PUT", data: data, headers: headers })
    .then((response) => {
      console.log("response: ", response);
      if (response.status > 300) {
        throw new Error("An error occured");
      }
      return response.json();
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};
