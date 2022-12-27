import Koa from "koa"
import { koaBody } from 'koa-body'
import cors from '@koa/cors'

import apiRouter from "./api"
import loadFixtures from "./fixtures"
import appConfig from "./config"
import { initSsoCert } from "./auth"



const app = new Koa()

app.use(cors());
app.use(koaBody());

app.use(apiRouter.routes());


(async () => {
    await loadFixtures(appConfig.clearDataBeforeLodingFixture)
    await initSsoCert()
    app.listen(8000)
    console.log('Server is ready at port 8000')
})();