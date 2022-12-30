import { IRepository } from "./IRepository";
import UserResult from "../models/UserResult";

export class UserResultRepository implements IRepository<UserResult> {
    async getAll(): Promise<UserResult[] | null> {
        return [
            { id: 1, announcementId: 1, result: '24.5', remark: 'โดนหักคะแนนจากการเข้าสอบสาย', updateDateTime: '2022-09-07 09:12:31', userCode: '6510110150'}
        ]
    }
}
