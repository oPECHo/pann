import db from "../db";
import Router from "koa-router";
import { nestObject } from "./utils";
import { AuthData } from "../auth";

const router = new Router()

const makeQuery = () => db('userResult').select(
    'userResult.*',
    'announcement.topic as announcementTopic',
    'announcement.description as announcementDescription',
    'announcement.remarkIfPositive as announcementRemarkIfPositive',
    'announcement.remarkIfNegative as announcementRemarkIfNegative',
    'announcement.pubDateTime as announcementPubDateTime'
).leftJoin('announcement', 'userResult.announcementId', 'announcement.id')

const findById = (id: number) => makeQuery().where({'userResult.id':id})

const updateUserResult = (id:number, userCode:string, data:any) => {
    return db('userResult').where({id,userCode}).update(data)
}

router
    .get('/', async (ctx,next) => {
        const authData = ctx.state.authData as AuthData
        let query = makeQuery().where({'userResult.userCode': authData.username})
        if (ctx.request.query['announcementId']) {
            const announcementId = Number(ctx.request.query['announcementId'])
            query = query.where({announcementId})
        }
        if (ctx.request.query['isPinned']) {
            const isPinned = Boolean(ctx.request.query['isPinned'])
            query = query.where({ isPinned })
        }
        if (ctx.request.query['keyword']) {
            const keyword = String(ctx.request.query['keyword'])
            query = query.where((it) => {it.where('announcement.topic', 'like', `%${keyword}%`).orWhere('announcement.description', 'like', `%${keyword}%`)})
        }
        const userResult = await query.orderBy('id', 'desc')
        ctx.body = userResult.map(it => nestObject(it, 'announcement'))
    })
    .get('/:id/markAsViewed', async (ctx,next) => {
        const id = parseInt(ctx.params.id)
        const authData = ctx.state.authData as AuthData
        const viewDateTime = new Date()
        const rowUpdated = await updateUserResult(id, authData.username, { viewDateTime })
        if(rowUpdated == 0){
            ctx.response.status = 404
            return
        }
        const userResults = await findById(id)
        const result = userResults.map(it => nestObject(it,'announcement'))
        ctx.body = result[0]
    })
    .get('/:id/acknowledge', async (ctx, next) => {
        const id = parseInt(ctx.params.id)
        const authData = ctx.state.authData as AuthData
        const ackDateTime = new Date()
        const rowUpdated = await updateUserResult(id, authData.username, { ackDateTime })
        if(rowUpdated == 0){
            ctx.response.status = 404
            return
        }
        const userResults = await findById(id)
        const result = userResults.map(it => nestObject(it,'announcement'))
        ctx.body = result[0]
    })
    .get('/:id/pin/:value', async (ctx, next) => {
        const id = parseInt(ctx.params.id)
        const authData = ctx.state.authData as AuthData
        const isPinned = ctx.params.value == '1'
        const rowUpdated = await updateUserResult(id, authData.username, { isPinned })
        if(rowUpdated == 0){
            ctx.response.status = 404
            return
        }
        const userResults = await findById(id)
        const result = userResults.map(it => nestObject(it,'announcement'))
        ctx.body = result[0]
    })


export default router
