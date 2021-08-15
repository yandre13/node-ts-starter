import {object, string, addMethod} from 'yup'

addMethod(object, 'atLeastOneOf', function (list) {
 return this.test({
  name: 'atLeastOneOf',
  message: '${path} must have at least one of these keys: ${keys}',
  exclusive: true,
  params: {keys: list.join(', ')},
  // @ts-ignore
  test: value => value == null || list.some(f => value[f] != null),
 })
})

const payload = {
 body: object({
  title: string().when('$allRequired', {
   is: true,
   then: s => s.required('Title is required'),
  }),
  body: string()
   .min(20, 'Body is too short - must be at least 20 characters')
   .when('$allRequired', {
    is: true,
    then: s => s.required('Body is required'),
   }),
 })
  .strict()
  .noUnknown(),
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
 body: object({
  title: string().when('$allRequired', {
   is: true,
   then: s => s.required('Title is required'),
  }),
  body: string()
   .min(20, 'Body is too short - must be at least 20 characters')
   .when('$allRequired', {
    is: true,
    then: s => s.required('Body is required'),
   }),
 })
  //@ts-ignore
  .atLeastOneOf(['title', 'body'])
  .strict()
  .noUnknown(),
})

export const deletePostSchema = object({
 ...params,
})
