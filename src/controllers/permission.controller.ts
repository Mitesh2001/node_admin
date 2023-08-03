import { getManager } from "typeorm"
import { Permission } from "../entity/permission.entity"
import { Request, Response } from "express"

export const Permissions = async ( request : Request, response : Response) => {
    
    const permissionRepository = getManager().getRepository(Permission)

    response.send(await permissionRepository.find())

}