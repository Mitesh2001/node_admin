import { Request, Response } from "express"
import { RegisterValidation } from "../validations/register.validation"
import { getManager } from "typeorm"
import { User } from "../entity/user.entity"
import bcryptjs from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

export const Register = async ( request : Request, response : Response) =>  {

    const body = request.body
    
    const { error } = RegisterValidation.validate(body)

    if (error) return response.status(400).send(error.details)

    body.password !== body.password_confirm && response.status(400).send({
        message : "Password doesn't match !"
    })

    const userRepository = getManager().getRepository(User)

    const { password, ...user } = await userRepository.save({
        first_name : body.first_name,
        last_name : body.last_name,
        email : body.email,
        password : await bcryptjs.hash(body.password,10)
    })
    
    response.send(user)
}

export const Login = async ( request : Request, response : Response) =>  { 

    const userRepository = getManager().getRepository(User);

    const user = await userRepository.findOne({ where : { email : request.body.email } })

    if (!user) {
        return response.status(400).send({
            message: 'invalid credentials!'
        })
    }

    if (!await bcryptjs.compare(request.body.password, user.password)) {
        return response.status(400).send({
            message: 'invalid credentials!'
        })
    }

    const token = sign({id: user.id}, process.env.JWT_SECRET_KEY)

    response.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    response.send({
        message: 'success'
    })

}

export const AuthUser = async ( request : Request, response : Response) => response.send(request['user'])

export const LogOut = async ( request : Request, response : Response) =>  {
    
    response.cookie('jwt', "", {
        maxAge: 0
    })

    response.send({
        message: 'success'
    })

}

export const UpdateInfo = async ( request : Request, response : Response) =>  { 

    const authUser = request['user']

    const userRepository = getManager().getRepository(User)

    await userRepository.update(authUser.id,request.body)

    const { password, ...data } = await userRepository.findOne({ where : { id : authUser.id } })

    response.send(data)
    
}

export const UpdatePassword = async ( request : Request, response : Response) =>  { 

    const authUser = request['user']

    const userRepository = getManager().getRepository(User)

    request.body.password !== request.body.password_confirm && response.status(400).send({
        message : "Password doesn't match !"
    })

    await userRepository.update(authUser.id,{
        password : await bcryptjs.hash(request.body.password,10)
    })

    const { password, ...data } = await userRepository.findOne({ where : { id : authUser.id } })

    response.send({
        message: 'success'
    })
    
}