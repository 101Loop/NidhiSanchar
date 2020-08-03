import axios from "axios";
import { API } from "../utils/consts";

export const createSchemeDiscussion = (data) => {
  const URL = API.BASE_PATH + API.CREATE_SCHEME_DISCUSSION;
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  //console.log("data: ", data);
  return axios(`${URL}`, { method: "POST", data: data, headers: headers })
    .then((response) => {
      //console.log("response: ", response);
      // if (response > 300) {
      //     throw new Error("An error occured");
      // }
      return response;
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

// Get a particular scheme discussion by scheme id
export const getSchemeDiscussion = (id) => {
  console.log("ID :", id);
  const URL = API.BASE_PATH + API.GET_SCHEME_DISCUSSION + `${id}`;
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

// Create scheme discussion messages by discussion ID
export const createSchemeDiscussionMessages = (data, discussionId) => {
  const URL =
    API.BASE_PATH +
    API.CREATE_SCHEME_DISCUSSION_MESSAGE +
    `${discussionId}/messages/`;
  const key = localStorage.getItem("jwt");
  const headers = { Authorization: `Bearer ${key}` };
  return axios(`${URL}`, { method: "POST", headers: headers, data: data })
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
};

// Get scheme discussion messages by discussion ID
export const getSchemeDiscussionMessages = (discussionId) => {
  const URL =
    API.BASE_PATH +
    API.GET_SCHEME_DISCUSSION_MESSAGE +
    `${discussionId}/messages`;
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
