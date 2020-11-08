import { Request, Response} from 'express';
import { container } from 'tsyringe';

import userWithoutPassword from '../../../../../dataMapper/userWithoutPassword';

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UsersController{
    public async create(request: Request, response: Response): Promise<Response> {
        let { name, email, password } = request.body

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            email,
            password
        })

        const datamapper = new userWithoutPassword()

        const UserWithoutPassword = datamapper.toDTO(user)

        return response.json(UserWithoutPassword)
    }
}
