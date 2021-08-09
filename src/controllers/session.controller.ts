import {Request, Response} from 'express'
import {validatePassword} from 'services/user.service'
import {
 createSession,
 createAccessToken,
 updateSession,
 findSessions,
} from 'services/session.service'
import {sign} from 'utils/jwt.utils'

export async function createSessionHandler(req: Request, res: Response) {
 try {
  //Validate email and password
  const user = await validatePassword(req.body)
  if (!user) {
   return res.status(401).send({
    success: false,
    error: 'Invalid username or password.',
   })
  }
  //Create a session
  const sessionMongoose = await createSession(
   user._id,
   req.get('User-Agent') || '',
  )
  const session = sessionMongoose.toJSON()
  //Create access token
  const accessToken = createAccessToken({user, session})
  //Create refresh token
  const refreshToken = sign(session, {expiresIn: '1y'})
  //Send tokens
  return res.status(201).send({
   succes: true,
   accessToken,
   refreshToken,
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}

export async function invalidateSessionHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const {session: sessionId} = req.user
  await updateSession({_id: sessionId}, {valid: false})

  return res.status(200).send({
   success: true,
   message: 'logout successfully',
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}

export async function getSessiosnHandler(req: Request, res: Response) {
 try {
  // @ts-ignore
  const userId = req.user?._id
  const sessions = await findSessions({user: userId, valid: true})
  return res.status(200).send({
   success: true,
   sessions,
  })
 } catch (error) {
  return res.status(400).send({
   success: false,
   error: error.message,
  })
 }
}
