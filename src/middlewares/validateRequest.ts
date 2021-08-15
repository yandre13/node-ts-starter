import {Request, Response, NextFunction} from 'express'
import {AnySchema} from 'yup'
import log from 'utils/log.utils'

type ValidateOptions = {
 context: {allRequired: boolean}
}
const validateRequest =
 (
  schema: AnySchema,
  options: ValidateOptions = {context: {allRequired: true}},
 ) =>
 async (req: Request, res: Response, next: NextFunction) => {
  try {
   await schema.validate(
    {
     body: req.body,
     query: req.query,
     params: req.params,
    },
    options,
   )
   return next()
  } catch (error) {
   log.error(error)
   return res.status(400).send({
    success: false,
    error: error.errors,
   })
  }
 }

export default validateRequest
