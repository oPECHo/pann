import { IRepository } from "./IRepository"
import UserResult from "../models/UserResult"
import config,{ ax } from "../config"

export interface UserResultFilter {
    keyword?: string
    isPinned?: boolean
}
export class UserResultRepository implements IRepository<UserResult> {
    urlPrefix = config.remoteRepositoryUrlPrefix
    async getAll(filter:UserResultFilter): Promise<UserResult[] | null> {
        const params = {...filter}
        const resp = await ax.get<UserResult[]>(`${this.urlPrefix}/userResult`, { params })
        return resp.data
    }
}
