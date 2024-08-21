import axios from '../util/apiClient';

const login = async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
};

export default { login };
