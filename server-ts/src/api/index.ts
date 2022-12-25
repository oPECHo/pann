import Router from "koa-router";
import announcement from './announcement'

const apiRouter = new Router()
apiRouter.use('/api/announcement',announcement.routes())

export default apiRouter