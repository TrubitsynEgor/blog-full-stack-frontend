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
export const fetchImageOnServer = async (file) => {
  const { data } = await axios.post('/upload', file)
  return data
}
export const createPostOnServer = async (fields) => {
  const { data } = await axios.post('/posts', fields)
  return data
}
export const deletePost = async (id) => await axios.delete(`/posts/${id}`)
