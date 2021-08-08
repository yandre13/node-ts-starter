import {Request, Response} from 'express'
import {createUser} from 'services/user.service'

export async function createUserHandler(req: Request, res: Response) {
 const user = await createUser(req.body)
 // @ts-ignore
 delete user.password
 return res.status(201).send({
  success: true,
  user,
 })
}
