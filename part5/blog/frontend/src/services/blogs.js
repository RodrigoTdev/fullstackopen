import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = token
}

export default { getAll, setToken }
