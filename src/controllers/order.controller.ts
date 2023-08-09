import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Order } from "../entity/order.entity";

export const Orders = async (request: Request, response: Response) => {
    
    const page = parseInt(request.query.page as string || '1')
    
    const take = 15;

    const orderRepository = getManager().getRepository(Order)
    
    const [ data, total ] = await orderRepository.findAndCount({
        take,
        skip : ( page - 1 ) * take,
        relations: ['order_item']
    })

    response.send({
        data : data.map(order => {
            return {
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_item
            }
        }),
        meta: {
            total,
            page,
            last_page: Math.ceil(total / take)
        }
    })

}