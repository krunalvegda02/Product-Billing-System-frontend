import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "v1/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line no-unused-vars
const _get = (url, data = {}, config = {}) => {
  return apiClient.get(url, config);
};

// eslint-disable-next-line no-unused-vars
const _delete = (url, data = {}, config = {}) => {
  return apiClient.delete(url, config);
};

const _patch = (url, data = {}, config = {}) => {
  return apiClient.patch(url, data, config);
};

const _post = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

export { _delete, _get, _post, _patch };
