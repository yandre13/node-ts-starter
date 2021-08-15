import {Request, Response, NextFunction} from 'express'

function requireUser(req: Request, res: Response, next: NextFunction) {
 //userId is null if not provided refreshToken
 // @ts-ignore
 const userId = req.session?._id
 if (!userId) {
  return res.status(403).send({
   success: false,
   error: 'Forbidden',
  })
 }
 return next()
}

export default requireUser
