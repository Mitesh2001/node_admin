import { Request, Response } from "express";
import { RegisterValidation } from "../validations/register.validation";

export const register = async ( request : Request, response : Response) =>  {
    const body = request.body;
    
    // const { error } = RegisterValidation.validate(body);

    // error && response.status(400).send(error.details)

    // body.password !== body.password_confirm && response.status(400).send({
    //     message : "Password doesn't match !"
    // })

    response.send(body);
};