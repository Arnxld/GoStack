import {Router} from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import userWithoutPassword from '../dataMapper/userWithoutPassword'

const usersRouter = Router()
const upload = multer(uploadConfig)



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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    try {
        const updateUserAvatar = new UpdateUserAvatarService()

        await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        })

        return response.json({ok: true})
    }
    catch(err) {
        return response.status(400).json({error: err.message})
    }
} )

export default usersRouter
