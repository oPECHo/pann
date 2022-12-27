import { AuthData } from 'auth'
import Router from 'koa-router'
import db from '../db'
const router = new Router()

router
  .get('/', async (ctx, next) => {            
    const authData = ctx.state.authData as AuthData
    let query = db('announcement').select('*').where({ 'announcement.userCode': authData.username })
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('topic', 'like', `%${keyword}%`).orWhere('description', 'like', `%${keyword}%`)})
    }
    ctx.body = await query.orderBy('id', 'desc')
  })
 


export default router