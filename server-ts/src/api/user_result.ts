import Router from "koa-router";

const router = new Router()

router
    .get('/',async(ctx,next) => {
        ctx.body = [
            { id: 1, announcementId: 1, result: '24.5', remark: 'โดนหักคะแนนจากการเข้าสอบสาย', updateDateTime: '2022-09-07 09:12:31', userCode: '6510110150'},
            { id: 2, announcementId: 1, result: '30.1', updateDateTime: '2022-09-07 11:12:00', userCode: '6510110140'},
            { id: 3, announcementId: 2, result: 'ได้รับทุน', remark: '', resultType: 1,  updateDateTime: '2022-09-08 10:12:30', userCode: '6510110140'}
        ]
    })
export default router