import axios from 'axios'
const baseUrl = '/api/blogs'

const login = async (credentials) => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token
}

export default { getAll, setToken, create, login }
