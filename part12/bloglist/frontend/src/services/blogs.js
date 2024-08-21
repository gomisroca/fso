import axios from '../util/apiClient';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get('/blogs');
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post('/blogs', newBlog, config);
  return response.data;
};

const updateLikes = (blog) => {
  const request = axios.put(`/blogs/${blog.id}`, { ...blog, likes: blog.likes + 1 });
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`/blogs/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, create, updateLikes, setToken, remove };
