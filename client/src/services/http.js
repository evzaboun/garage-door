import axios from "axios";

const http = {};

http.post = (endpoint, message) => {
  return axios({
    method: "post",
    url: endpoint,
    data: message,
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  });
};

http.get = () => {};

export default http;
