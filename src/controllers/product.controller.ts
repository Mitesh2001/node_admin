import { getManager } from "typeorm"
import { Request, Response } from "express"
import { Product } from "../entity/product.entity"

export const Products = async (request: Request, response: Response) => {
    
    const page = parseInt(request.query.page as string || '1')
    
    const take = 15;

    const productRepository = getManager().getRepository(Product)

    const [ data, total ] = await productRepository.findAndCount({
        take,
        skip : ( page - 1 ) * take
    })

    response.send({
        data,
        meta : {
            total,
            page,
            last_page : Math.ceil( total / take )
        }
    })

}

export const CreateProduct = async (request: Request, response: Response) => {

    const productRepository = getManager().getRepository(Product)

    const product = await productRepository.save(request.body)

    response.send(product)

}

export const GetProduct = async (request: Request, response: Response) => {

    try {

        const productRepository = getManager().getRepository(Product)

        const product = await productRepository.findOne({ where: { id: parseInt(request.params.id) }})

        response.send(product)

    } catch (error) {
        response.send({
            message: "Something went wrong !"
        })
    }

}

export const UpdateProduct = async (request: Request, response: Response) => {

    try {

        const { ...body } = request.body

        const productRepository = getManager().getRepository(Product)

        await productRepository.update(request.params.id, {
            ...request.body
        })

        const product = await productRepository.findOne({ where: { id: parseInt(request.params.id) }})

        response.send(product)

    } catch (error) {

        response.send({
            message: "Something went wrong !"
        })

    }
}

export const DeleteProduct = async (request: Request, response: Response) => {

    try {

        const productRepository = getManager().getRepository(Product)

        await productRepository.delete(request.params.id)

        response.send({
            message: "Success !"
        })

    } catch (error) {

        response.send({
            message: "Something went wrong !"
        })

    }

}