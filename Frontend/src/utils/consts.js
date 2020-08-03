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
    GET_FUND_REQUEST_BY_SCHEME_ID: "/schemes/v1/request-per-scheme/",
    CREATE_FUND_REQUEST: "/schemes/v1/create-fund-request/",
    CREATE_SCHEME_DISCUSSION: "/discussions/v1/scheme-discussions-list/",
    CREATE_SCHEME_DISCUSSION_MESSAGE: "/discussions/v1/scheme-discussion/",
    GET_SCHEME_DISCUSSION_MESSAGE: "/discussions/v1/scheme-discussion/",
    GET_SCHEME_DISCUSSION: "/discussions/v1/discussion-per-scheme/",
    GET_CENTRE_DASHBOARD_BOX_INFO: "/department/v1/center-department/",
    GET_STATE_DASHBOARD_BOX_INFO: "/department/v1/state-department/",
    GET_LANDING_PAGE_BOX_INFO: "/department/v1/stats/",
    GET_PROFILE_INFO: "/userprofile/v1/userinfo/",
    HELP: "/help/v1/help/"
};
