import { getManager } from "typeorm"
import { Request, Response } from "express"
import { Role } from "../entity/role.entity"

export const Roles = async ( request : Request, response : Response) => {
    
    const roleRepository = getManager().getRepository(Role)

    response.send(await roleRepository.find())

}

export const createRole = async ( request : Request, response : Response) => {
    
    const roleRepository = getManager().getRepository(Role)

    const { name, permissions } = request.body

    const role = roleRepository.save({
        name,
        permissions : permissions.map(id => ({id}))
    })

    response.status(201).send(role)

}

export const GetRole = async ( request : Request, response : Response) => { 

    const roleRepository = getManager().getRepository(Role)

    response.send(await roleRepository.findOne({ where : { id : request.params.id }, relations : ['permissions'] }))

}

export const UpdateRole = async ( request : Request, response : Response) => { 

    const roleRepository = getManager().getRepository(Role)

    const { name, permissions } = request.body

    await roleRepository.update(request.params.id, {
        name       
    })

    const role = response.send(await roleRepository.findOne({ where : { id : request.params.id }, relations : ['permissions'] }))

    response.status(201).send(role)

}

export const DeleteRole = async ( request : Request, response : Response) => { 

    const roleRepository = getManager().getRepository(Role)
    
    response.status(204).send(null);

}