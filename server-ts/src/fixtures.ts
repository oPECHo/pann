import db from "./db"

async function loadFixtures(clearData = false){
    if(clearData){
      console.warn('clearing data')
      await db('userResult').del()
      await db('announcement').del()
    }
  
    await db.batchInsert('announcement', [
      { id: 1, topic: '240-124 Midterm 1/2566', description: 'คะแนนกลางภาควิชา Web Dev', pubDateTime: '2022-09-08 10:00:00', userCode: 'suthon.s'},
      { id: 2, topic: 'ทุนเรียนดีประจำปี 2566', description: 'test', remarkIfPositive: 'ขอแสดงความยินดีกับผุ้ได้รับทุนเรียนดีทุกคนด้วย', pubDateTime: '2022-09-09 15:00:00', userCode: 'suthon.s'},
    ])
    
    await db.batchInsert('userResult', [
      { id: 1, announcementId: 1, result: '24.5', remark: 'โดนหักคะแนนจากการเข้าสอบสาย', updateDateTime: '2022-09-07 09:12:31', userCode: '6510110150'},
      { id: 2, announcementId: 1, result: '30.1', updateDateTime: '2022-09-07 11:12:00', userCode: '6510110140'},
      { id: 3, announcementId: 2, result: 'ได้รับทุน', remark: '', resultType: 1,  updateDateTime: '2022-09-08 10:12:30', userCode: '6510110140'},
    ])
  }

  export default loadFixtures