import {Router} from 'express'
import CreateUserService from '../services/CreateUserService'
import userWithoutPassword from '../dataMapper/userWithoutPassword'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
    try {
        let { name, email, password } = request.body

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        })

        const datamapper = new userWithoutPassword()

        const UserWithoutPassword = datamapper.toDTO(user)

        return response.json(UserWithoutPassword)
    } catch(err) {
        return response.status(400).json({error: err.message})
    }
})

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
    return response.json({ok: true})
} )

export default usersRouter
