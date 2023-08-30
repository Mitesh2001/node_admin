import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getManager } from 'typeorm';
import { User } from '../entity/user.entity';

export const AuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const jwt = request.cookies['jwt'];

        const payload: any = verify(jwt, process.env.JWT_SECRET_KEY);

        if (!payload) {
            return response.status(400).send({
                message: 'Unauthenticated !'
            });
        }

        const userRepository = getManager().getRepository(User);

        const { password, ...user } = await userRepository.findOne({ where: { id: payload.id }, relations:['role','role.permissions'] });

        request['user'] = user;

        next();

    } catch (error) {
        return response.status(400).send({
            message: 'Unauthenticated !'
        });
    }
};
