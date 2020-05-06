import axios from "axios";
import auth from "../services/auth";

const http = {};

http.post = (endpoint, message) => {
  return axios({
    method: "post",
    url: endpoint,
    data: message,
    headers: {
      "content-type": "application/json;charset=utf-8",
      "x-auth-token": auth.getToken(),
    },
  });
};

http.get = (endpoint) => {
  return axios({
    method: "get",
    url: endpoint,
    headers: {
      "content-type": "application/json;charset=utf-8",
      "x-auth-token": auth.getToken(),
    },
  });
};

export default http;
