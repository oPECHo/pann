import Router from "koa-router";
import announcement from './announcement'
import { authMiddleware } from "../auth";

const apiRouter = new Router()
apiRouter.use('/api/announcement',authMiddleware,announcement.routes())

export default apiRouter