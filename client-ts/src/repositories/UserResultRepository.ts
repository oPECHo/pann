import { IRepository } from "./IRepository"

export default interface UserResult{
    id: number
    announcementId: number
    result: string
    remark: string
    updateDateTime: Date
    userCode: string
  }

export class UserResultRepository implements IRepository<UserResult> {
    async getAll(): Promise<UserResult[] | null> {
        return [
            { id: 1,announcementId: 1, result: '24.5', remark: 'โดนหักคะแนนจากการเข้าสอบสาย', updateDateTime: new Date('2022-09-07 09:12:31'), userCode: '6510110150'}
        ]
    }
}
