import {object, string} from 'yup'

const payload = {
 body: object({
  title: string().required('Title is required'),
  body: string()
   .required('Body is required')
   .min(20, 'Body is too short - must be at least 20 characters'),
 }),
}
const params = {
 params: object({
  id: string().required('postId is required'),
 }),
}

export const createPostSchema = object({
 ...payload,
})

export const updatePostSchema = object({
 ...params,
 ...payload,
})

export const deletePostSchema = object({
 ...params,
})
