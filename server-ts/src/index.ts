import Koa from "koa"
import { koaBody } from 'koa-body'
import cors from '@koa/cors'

import apiRouter from "./api"
const app = new Koa()

app.use(cors());
app.use(koaBody());

app.use(apiRouter.routes());

app.listen(8000)