import { getManager } from "typeorm"
import { User } from "../entity/user.entity"
import { Request, Response } from "express"
import bcryptjs from "bcryptjs"

export const Users = async (request: Request, response: Response) => {

    const page = parseInt(request.query.page as string || '1')

    const take = 5

    const userRepository = getManager().getRepository(User)

    const [users, total] = await userRepository.findAndCount({
        take,
        skip : ( page - 1 ) * take,
        relations : ["role"]
    })

    response.send({
        data : users.map(user => {
            delete user.password
            return user
        }),
        meta : {
            total,
            page,
            last_page : Math.ceil( total / take )
        }
    })

}

export const CreateUser = async (request: Request, response: Response) => {

    const { role_id, ...body } = request.body
    const hasedPassword = await bcryptjs.hash("secret", 10)

    const userRepository = getManager().getRepository(User)

    const { password, ...user } = await userRepository.save({
        ...body,
        password: hasedPassword,
        role: {
            id: role_id
        }
    })

    response.send(user)

}

export const GetUser = async (request: Request, response: Response) => {

    try {

        const userRepository = getManager().getRepository(User)

        const { password, ...user } = await userRepository.findOne({ where: { id: parseInt(request.params.id) }, relations: ['role'] })

        response.send(user)

    } catch (error) {
        response.send({
            message: "Something went wrong !"
        })
    }

}

export const UpdateUser = async (request: Request, response: Response) => {

    try {

        const { role_id, ...body } = request.body

        const userRepository = getManager().getRepository(User)

        await userRepository.update(request.params.id, {
            ...body,
            role: {
                id: role_id
            }
        })

        const { password, ...user } = await userRepository.findOne({ where: { id: parseInt(request.params.id) }, relations: ['role'] })

        response.send(user)

    } catch (error) {

        response.send({
            message: "Something went wrong !"
        })

    }
}

export const DeleteUser = async (request: Request, response: Response) => {

    try {

        const userRepository = getManager().getRepository(User)

        await userRepository.delete(request.params.id)

        response.send({
            message: "Success !"
        })

    } catch (error) {

        response.send({
            message: "Something went wrong !"
        })

    }

}