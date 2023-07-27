import express, { Request, Response } from 'express';
import { routes } from './routes';
import bodyParser from "body-parser";


const app = express();

routes(app);
app.use(bodyParser.json());


app.listen(8000, () => {
    console.log('Listenign port 8000')
})