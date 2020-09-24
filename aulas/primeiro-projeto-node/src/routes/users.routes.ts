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
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    const datamapper = new userWithoutPassword()
    const UserWithoutPassword = datamapper.toDTO(user)

    return response.json(UserWithoutPassword)
} )

export default usersRouter
