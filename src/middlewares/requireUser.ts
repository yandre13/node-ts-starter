import {Request, Response, NextFunction} from 'express'

function requireUser(req: Request, res: Response, next: NextFunction) {
 // @ts-ignore
 const user = req.user
 if (!user) {
  return res.status(403).send({
   success: false,
   error: 'Forbidden',
  })
 }
 return next()
}

export default requireUser
