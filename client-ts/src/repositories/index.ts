import { AnnouncementRepository } from "./AnnouncementRepository";
import { UserResultRepository } from "./UserResultRepository";

const repository = {
    announcements: new AnnouncementRepository(),
    UserResults: new UserResultRepository()
}
export default repository