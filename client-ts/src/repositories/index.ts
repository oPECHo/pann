import { AnnouncementRepository } from "./AnnouncementRepository";
import { UserResultRepository } from "./UserResultRepository";

const repository = {
    announcement: new AnnouncementRepository(),
    UserResult: new UserResultRepository()
}
export default repository