import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Order } from "../entity/order.entity";
import { Parser } from "json2csv";
import { OrderItem } from "../entity/order-item.entity";

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

export const Export = async (request: Request, response: Response) => {

    const parser = new Parser({
        fields : ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    })

    const orderRepository = getManager().getRepository(Order)

    const orders = await orderRepository.find({relations : ['order_item']})

    const json = [];

    orders.forEach((order : Order) => {

        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: ''
        })

        order.order_item.forEach((item : OrderItem) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity
            })
        })

    });

    const csv = parser.parse(json);
    response.header('Content-Type', 'text/csv');
    response.attachment('orders.csv');
    response.send(csv);

}