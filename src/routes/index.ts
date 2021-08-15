import {Router, Request, Response} from 'express'

import {deserializeUser} from 'middlewares'
import postRoute from 'routes/post.route'
import userRoute from 'routes/user.route'

const router = Router()

router.use(deserializeUser)
router.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

userRoute(router)
postRoute(router)

export default router
