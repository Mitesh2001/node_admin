import express, { Request, Response } from 'express';
import { routes } from './routes';
import { createConnection } from 'typeorm';

createConnection().then(connection => {

    const app = express()
    const port = 8001
    
    app.use(express.json())
    routes(app)
    
    app.listen(port, () => {
        console.log(`Listenign port ${port}`)
    })

})