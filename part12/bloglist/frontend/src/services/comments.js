import axios from '../util/apiClient';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get('/comments');
  return request.then((response) => response.data);
};

const create = async (comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post('/comments', comment, config);
  return response.data;
};

export default { getAll, create, setToken };
