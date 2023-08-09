import { createConnection, getManager } from "typeorm";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";
import { Order } from "../entity/order.entity";
import { OrderItem } from "../entity/order-item.entity";

createConnection().then(async connection => {
    const orderRepository = getManager().getRepository(Order)
    const orderItemRepository = getManager().getRepository(OrderItem)

    for (let i = 0; i < 30; i++) {
        
        const order = await orderRepository.save({
            first_name: faker.person.firstName(),
            last_name : faker.person.lastName(),
            email: faker.internet.email()
        })

        for (let i = 0; i < randomInt(1,5); i++) {
            await orderItemRepository.save({
                product_title : faker.lorem.word(10),
                price : randomInt(10,100),
                quantity : randomInt(1,5),
                order
            })
        }
        
    }

    process.exit(0)

})