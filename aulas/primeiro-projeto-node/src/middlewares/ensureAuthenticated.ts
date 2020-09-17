import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'

import authConfig from '../config/auth'

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
    ): void {
    // validação do token JWT]
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing')
    }

    // dividir Bearer do token (Bearer ajdbksajbdskjd)

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, authConfig.jwt.secret)

        const {sub} = decoded as TokenPayload // forçando que o token é do tipo TokenPayload

        request.user = {
            id: sub,
        }

        return next()
    } catch {
        throw new Error('Invalid JWT token!')
    }

}
