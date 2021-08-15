import {Router} from 'express'
import {requireUser, validateRequest} from 'middlewares'
import {createUserSchema, createUserSessionSchema} from 'schemas/user.schema'
import {createUserHandler} from 'controllers/user.controller'
import {
 createSessionHandler,
 invalidateSessionHandler,
 getSessiosnHandler,
} from 'controllers/session.controller'

export default function (router: Router) {
 router
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
}
