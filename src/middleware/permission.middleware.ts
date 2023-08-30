import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";

export const PermissionMiddleware = (access : string) => {
    return (request : Request, response : Response, next : NextFunction) => {
        const user : User = request['user'];
        const permissions = user.role.permissions;

        if (request.method === 'GET') {
            if (!permissions.some(permission => permission.name == `view_${access}` || permission.name == `edit_${access}`)) {
                return response.status(401).send({
                    message: 'unauthorized'
                })
            }
        } else {
            if (!permissions.some(permission => permission.name == `edit_${access}`)) {
                return response.status(401).send({
                    message: 'unauthorized'
                })
            }
        }

        next()
    }
}