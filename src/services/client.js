import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;

axiosClient.interceptors.response.use(
  function (response) {
    //Dispatch any action on success
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      console.log('401 error, should redirect to login');

      //Add Logic to
      //1. Redirect to login page or
      //2. Request refresh token
    }
    return Promise.reject(error);
  }
);

export default class client {
  static setToken(token) {
    axiosClient.defaults.headers = {
      ...axiosClient.defaults.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  static get(URL) {
    return axiosClient.get(URL).then((response) => response);
  }
  static post(URL, payload) {
    return axiosClient.post(URL, payload).then((response) => response);
  }
  static put(URL, payload) {
    return axiosClient.put(URL, payload).then((response) => response);
  }
  static patch(URL, payload) {
    return axiosClient.patch(URL, payload).then((response) => response);
  }
  static delete(URL) {
    return axiosClient.delete(URL).then((response) => response);
  }
}
