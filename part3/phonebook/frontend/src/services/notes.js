import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const getById = (id) => {
  const request = axios.get(`${url}/${id}`)
  return request.then((response) => response.data)
}

const addPerson = (object) => {
  const request = axios.post(url, object)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then((response) => response.data)
}

const editPerson = (object) => {
  const request = axios.put(`${url}/${object.id}`, object)
  return request.then((response) => response.data)
}

export default {
  getAll,
  addPerson,
  deletePerson,
  editPerson,
  getById,
}
