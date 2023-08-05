import { createConnection, getManager } from "typeorm";
import { Product } from "../entity/product.entity";
import { faker } from '@faker-js/faker';
import { randomInt } from "crypto";

createConnection().then(async connection => {
    const productRepository = getManager().getRepository(Product)

    for (let i = 0; i < 30; i++) {
        
        await productRepository.save({
            title: faker.lorem.word(10) ,
            description : faker.lorem.words(20),
            image: faker.image.url({ width : 200, height : 200 }),
            price: randomInt(10, 100)
        })
        
    }

    process.exit(0)

})