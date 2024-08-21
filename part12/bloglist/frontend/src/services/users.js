import axios from '../util/apiClient';

const getAll = () => {
  const request = axios.get('/users');
  return request.then((response) => response.data);
};

export default { getAll };
