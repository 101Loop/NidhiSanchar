export const API = {
    BASE_PATH: process.env.REACT_APP_BACKEND,
    LOGIN: "/user/login/",
    LOGOUT: "/user/logout/",
    CREATE_SCHEME: "/schemes/v1/create-schemes/",
    GET_SCHEMES: "/schemes/v1/all-schemes/",
    UPDATE_SCHEMES: "/schemes/v1/update-scheme/",
    GET_SCHEME_BY_SLUG: "/schemes/v1/update-scheme/",
    GET_USER_INFO: "/userprofile/v1/userinfo/",
    GET_FUND_REQUESTS: "/schemes/v1/fund-request/",
    CREATE_FUND_REQUEST: "/schemes/v1/create-fund-request/",
    CREATE_SCHEME_DISCUSSION: "/discussions/v1/scheme-discussions-list/",
    CREATE_SCHEME_DISCUSSION_MESSAGE: "/discussions/v1/scheme-discussion/",
    GET_SCHEME_DISCUSSION_MESSAGE: "/discussions/v1/scheme-discussion/",
    GET_SCHEME_DISCUSSION: "/discussions/v1/discussion-per-scheme/",
};
