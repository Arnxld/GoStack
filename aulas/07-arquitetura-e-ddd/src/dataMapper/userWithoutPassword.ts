import User from "../models/User"

export default class UserMap {
    public toDTO(user: User): any {
        return {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    }
}
