import axios from "axios";
import jwt_decode from "jwt-decode";

export default function setupInterceptors(history) {
  axios.defaults.baseURL = "http://localhost:3300";
  axios.interceptors.request.use(
    function (req) {
      console.log(req.method, req.url);
      let accessToken = localStorage.getItem("library_access_token");
      console.log("line 9", { accessToken });
      if (!accessToken) {
        console.log("Access Token Not found");
      } else {
        req.headers["authorization"] = "Bearer " + accessToken;
      }
      return req;
    },
    function (error) {
      console.log("Error: ", error.message);
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    function (response) {
    return response;
    },
    async function (error) {
      console.log("Error", error.response.status);
      let { status } = error.response;
      const originalRequest = error.config;
      if (status === 403) {
        if (localStorage.getItem("library_refresh_token")) {
          let refreshToken = localStorage.getItem("library_refresh_token");
          let decoded = jwt_decode(refreshToken);
          console.log("decoded is: ", decoded);
          await fetch("http://localhost:3300/auth/token", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: decoded.email, token: refreshToken }),
          }).then(async (resp) => {
            if (resp.status === 403 || resp.status === 401) {
              console.log("I am here");
              history.replace("/login");
            } else if (resp.status === 201) {
              //TODO
              console.log("received new tokens I guess");
               await resp
                .json()
                .then((result) =>{
                  localStorage.setItem(
                    "library_access_token",
                    result["access_token"]
                  );
                  console.log(localStorage.getItem("library_access_token"))
                  });
              return axios(originalRequest);
            }
          });
        }
      }
      return Promise.reject(error);
    }
  );
}
