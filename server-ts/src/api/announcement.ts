import Router from "koa-router"
const router = new Router()
router
    .get('/', async(ctx,next) => {
        ctx.body = [
            { id: 1, topic: '240-124 Midterm 1/2566', description: 'คะแนนกลางภาควิชา Web Dev', pubDateTime: '2022-09-08 10:00:00', userCode: 'suthon.s'},
            { id: 2, topic: 'ทุนเรียนดีประจำปี 2566', description: 'test', remarkIfPositive: 'ขอแสดงความยินดีกับผุ้ได้รับทุนเรียนดีทุกคนด้วย', pubDateTime: '2022-09-09 15:00:00', userCode: 'suthon.s'}
        ]
    })

export default router