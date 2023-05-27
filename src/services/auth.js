import axios from './axios'

export const fetchLogin = async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data
}
