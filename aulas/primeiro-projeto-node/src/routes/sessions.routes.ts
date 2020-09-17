import {Router} from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'
import userWithoutPassword from '../dataMapper/userWithoutPassword'


const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body

        const authenticateUser = new AuthenticateUserService()

        let { user, token } = await authenticateUser.execute({
            email,
            password
        })

        const dataMapper = new userWithoutPassword;

        user = dataMapper.toDTO(user)


        return response.json({user, token})
    } catch(err) {
        return response.status(400).json({error: err.message})
    }
})


export default sessionsRouter
