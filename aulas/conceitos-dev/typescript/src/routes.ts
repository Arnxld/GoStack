import {Request, Response} from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        name: "Diego",
        email: 'ff',
        password: 'qwewqe',
        techs: ['Node,js', 'React', {title: 'Javascript', experience:100}]
    });

    console.log(user.email)
    
    return response.json({message: "HEllo World"})
}