import Announcement from "./Announcement"

export enum ResultType{
  NEGATIVE = -1,
  POSITIVE = 1,
  NORMAL = 0,
}

export default interface UserResult{
  id: number
  announcement: Partial<Announcement>
  result: string
  resultType: ResultType
  remark: string
  isPinned: boolean
  viewDateTime: Date
  ackDateTime: Date
  updateDateTime: Date
  expireDateTime: Date
  userCode: string
  _updated?: boolean
  _deleted?: boolean
}