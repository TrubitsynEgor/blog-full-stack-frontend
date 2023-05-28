import axios from './axios'

export const fetchLogin = async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data
}
export const fetchReg = async (params) => {
  const { data } = await axios.post('/auth/register', params)
  return data
}
export const fetchMe = async () => {
  const { data } = await axios.get('/auth/me')
  return data
}
