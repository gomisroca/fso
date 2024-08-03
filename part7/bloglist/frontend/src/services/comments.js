import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, comment, config);
  return response.data;
};

export default { getAll, create, setToken };
