import express, { Request, Response } from 'express';
import { routes } from './routes';

const app = express();
const port = 8001

app.use(express.json());
routes(app);

app.listen(port, () => {
    console.log(`Listenign port ${port}`)
})