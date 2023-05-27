import axios from './axios'

export const getAllPosts = async () => {
  return await axios.get('/posts')
}
export const getAllTags = async () => {
  return await axios.get('/tags')
}
export const getPostById = async (id) => {
  return await axios.get(`/posts/${id}`)
}
