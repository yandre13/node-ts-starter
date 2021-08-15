import {Router} from 'express'
import {requireUser, validateRequest} from 'middlewares'
import {
 createPostSchema,
 deletePostSchema,
 updatePostSchema,
} from 'schemas/post.schema'
import {
 createPostHandler,
 deletePostHandler,
 getPostHandler,
 updatePostHandler,
} from 'controllers/post.controller'

export default function (router: Router) {
 router
  //posts
  .post(
   '/posts',
   [requireUser, validateRequest(createPostSchema)],
   createPostHandler,
  )

  .put(
   '/posts/:id',
   [
    requireUser,
    validateRequest(updatePostSchema, {context: {allRequired: false}}),
   ],
   updatePostHandler,
  )

  .get('/posts/:id', getPostHandler)

  .delete(
   '/posts/:id',
   [requireUser, validateRequest(deletePostSchema)],
   deletePostHandler,
  )
}
