import Koa from 'koa'
import { AuthData } from 'auth'
import Router from 'koa-router'
import { pick } from 'lodash'
import db from '../db'
const router = new Router()

const makeQuery = () => db('announcement').select('*')
const findById = (id: number) => makeQuery().where({id})

const prepareAnnoucementById = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const id = parseInt(ctx.params.id)
  const announcement = await findById(id).first()
  if(!announcement){
    ctx.response.status = 404
    return
  }
  ctx.state.announcement = announcement
  await next()
}

const USER_RESULT_BINDABLE = ['result', 'resultType', 'remark']

router
  .get('/', async (ctx, next) => {            
    const authData = ctx.state.authData as AuthData
    let query = makeQuery().where({ 'announcement.userCode': authData.username })
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('topic', 'like', `%${keyword}%`).orWhere('description', 'like', `%${keyword}%`)})
    }
    ctx.body = await query.orderBy('id', 'desc')
  })
  .get('/:id', prepareAnnoucementById, async (ctx, next) => {    
    ctx.body = ctx.state.announcement
  })
  .post('/', async (ctx, next) => {    
    const id = (await db('announcement').insert({...ctx.request.body, pubDateTime: new Date()}))[0]
    ctx.body = await findById(id).first()
  })
  .put('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    delete ctx.request.body.id
    const rowUpdated = await findById(id).update(ctx.request.body)
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = await findById(id).first()
  })
  .del('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const rowUpdated = await findById(id).del()
    ctx.body = {statusCode: rowUpdated > 0 ? 1 : 0}
  })
  .get('/:id/results', prepareAnnoucementById, async (ctx, next) => {
    const announcement = ctx.state.announcement
    ctx.body = await db('userResult').select('*').where({'announcementId': announcement.id}).orderBy('userCode', 'asc')
  })
  .post('/:id/results', prepareAnnoucementById, async (ctx, next) => {
    const announcement = ctx.state.announcement
    const items = ctx.request.body as any[]    
    for(let item of items){
      console.log('processing..', item)
      const query = db('userResult').where({id: item.id})
      if(item.id){
        if(item._updated){
          item = pick(item, USER_RESULT_BINDABLE)
          await query.update(item)
        }else if(item._deleted){
          await query.del()
        }
      }else{
        item.announcementId = announcement.id
        item.update_date_time = new Date()
        await db('userResult').insert(item)
      }
    }
    ctx.body = {statusCode: 1}
  })


export default router