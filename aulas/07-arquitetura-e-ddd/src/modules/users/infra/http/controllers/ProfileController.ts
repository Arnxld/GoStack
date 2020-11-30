import { Request, Response} from 'express';
import { container } from 'tsyringe';

import userWithoutPassword from '../../../../../dataMapper/userWithoutPassword';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController{
    public async show(request: Request, response: Response) : Promise<Response> {
        // exibição do perfil
        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        const datamapper = new userWithoutPassword();

        const UserWithoutPassword = datamapper.toDTO(user);

        return response.json(UserWithoutPassword);
    }


    public async update (request: Request, response: Response): Promise<Response> {
        let { name, email, old_password, password } = request.body
        const user_id = request.user.id;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password,
        })

        const datamapper = new userWithoutPassword()

        const UserWithoutPassword = datamapper.toDTO(user)

        return response.json(UserWithoutPassword)
    }
}
