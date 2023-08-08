require("dotenv").config();
import express, { Request, Response } from 'express';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

createConnection().then(connection => {

    const app = express()
    const port = 8080
    
    app.use(express.json())
    app.use(cookieParser())
    routes(app)
    
    app.listen(port, () => {
        console.log(`Listenign port ${port}`)
    })

})