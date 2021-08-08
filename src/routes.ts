import {Router, Request, Response} from 'express'
import {createUserHandler} from 'controllers/user.controller'
import {
 createSessionHandler,
 invalidateSessionHandler,
 getSessiosnHandler,
} from 'controllers/session.controller'
import {deserializeUser, requireUser, validateRequest} from 'middlewares'
import {createUserSchema, createUserSessionSchema} from 'schemas/user.schema'
import {
 createPostHandler,
 deletePostHandler,
 getPostHandler,
 updatePostHandler,
} from 'controllers/post.controller'
import {
 createPostSchema,
 deletePostSchema,
 updatePostSchema,
} from 'schemas/post.schema'

const router = Router()

router.use(deserializeUser)
router
 .get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

 //User
 .post('/users', validateRequest(createUserSchema), createUserHandler)

 //Login
 .post(
  '/sessions',
  validateRequest(createUserSessionSchema),
  createSessionHandler,
 )
 //Get sessions history
 .get('/sessions', requireUser, getSessiosnHandler)
 //logout
 .delete('/sessions', requireUser, invalidateSessionHandler)

 //posts
 .post(
  '/posts',
  [requireUser, validateRequest(createPostSchema)],
  createPostHandler,
 )

 .put(
  '/posts/:id',
  [requireUser, validateRequest(updatePostSchema)],
  updatePostHandler,
 )

 .get('/posts/:id', getPostHandler)

 .delete(
  '/posts/:id',
  [requireUser, validateRequest(deletePostSchema)],
  deletePostHandler,
 )

export default router
