export default interface Announcement{
    id: number
    topic: string
    description: string
    remarkIfPositive: string
    remarkIfNegative: string 
    pubDateTime: Date
    userCode: string
}