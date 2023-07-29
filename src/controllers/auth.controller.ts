import { Request, Response } from "express"
import { RegisterValidation } from "../validations/register.validation"
import { getManager } from "typeorm";
import { User } from "../entity/user.entity";
import bcryptjs from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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

    const {password, ...user} = await userRepository.findOne({ where : { email : request.body.email } });

    if (!user) {
        return response.status(400).send({
            message: 'invalid credentials!'
        })
    }

    if (!await bcryptjs.compare(request.body.password, password)) {
        return response.status(400).send({
            message: 'invalid credentials!'
        })
    }

    const token = sign({id: user.id}, "secret");

    response.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1day
    })

    response.send({
        message: 'success'
    })

    return response.send(user)

}

export const AuthUser = async ( request : Request, response : Response) =>  {
    
    const jwt = request.cookies['jwt']
    
    const payload : any = verify(jwt, "secret");

    if (!payload) {
        return response.status(400).send({
            message: 'Unauthenticated !'
        })
    }

    const userRepository = getManager().getRepository(User)

    const {password, ...user} = await userRepository.findOne({ where : { id : payload.id } })

    response.send(user)

}