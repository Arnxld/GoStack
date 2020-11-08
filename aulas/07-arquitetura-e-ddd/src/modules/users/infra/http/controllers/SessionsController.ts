import { Request, Response} from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import userWithoutPassword from '../../../../../dataMapper/userWithoutPassword';

export default class SessionsController{
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body

        const authenticateUser = container.resolve(AuthenticateUserService)

        let { user, token } = await authenticateUser.execute({
            email,
            password
        })

        const dataMapper = new userWithoutPassword;

        user = dataMapper.toDTO(user)


        return response.json({user, token})
    }
}
