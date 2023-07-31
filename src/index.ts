require("dotenv").config();
import express, { Request, Response } from 'express';
import { routes } from './routes';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';

createConnection().then(connection => {

    const app = express()
    const port = process.env.PORT
    
    app.use(express.json())
    app.use(cookieParser())
    routes(app)
    
    app.listen(port, () => {
        console.log(`Listening port ${port}`)
    })

})