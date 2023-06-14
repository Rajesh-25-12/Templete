import axios from "axios";

// Determine the base URL based on the current hostname
const baseurl = () => {
  if (window.location.hostname === "royal.techgenzi.com") {
    return "https://pgmetals-api.techgenzi.com/";
  } else {
    return "https://ipssapi.techgenzi.com";
  }
};

// Create an instance of axios with default settings for API calls without authorization
export const getApi = () =>
  axios.create({
    baseURL: baseurl(),
    headers: {
      Accept: "application/json",
    },
  });

// Create an instance of axios with default settings for API calls with authorization
export const liveApi = () =>
  axios.create({
    baseURL: baseurl(),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
