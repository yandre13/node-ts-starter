import {Request, Response, NextFunction} from 'express'
import {reIssueAccessToken} from 'services/session.service'
import {decode} from 'utils/jwt.utils'

async function deserializeUser(
 req: Request,
 res: Response,
 next: NextFunction,
) {
 const accessToken = req.get('authorization')?.replace(/^Bearer\s/, '')
 const refreshToken = req.get('x-refresh')
 if (!accessToken) return next()
 //Get token values
 const {decoded, expired} = decode(accessToken)
 if (decoded) {
  // @ts-ignore
  req.session = decoded
  return next()
 }
 //Update access token
 if (expired && refreshToken) {
  const newAccessToken = await reIssueAccessToken(refreshToken)
  if (newAccessToken) {
   //Add new access token to the response header
   res.setHeader('x-access-token', newAccessToken)
   const {decoded} = decode(newAccessToken)
   // @ts-ignore
   req.session = decoded
  }
  return next()
 }
 return next()
}

export default deserializeUser
