import * as express from 'express';
import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { List } from './models';

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/express-app', { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    err => {
        console.log('Can not connect to the database' + err);
    },
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/list', (req: Request, res: Response) => {
    List.find((err, arr) => {
        res.send(arr);
    });
});

app.post('/api/list', (req: Request, res: Response) => {
    const { title } = req.body;
    List.find((err, arr) => {
        List.create({ title, id: arr.length });
    }).then(arr => {
        res.send({
            id: arr.length,
        });
    });
});

app.delete('/api/list/:id', (req: Request, res: Response) => {
    List.find((err, arr) => {
        if (err)
            res.send({
                success: false,
                error: err,
            });
        const { _id: id } = arr.find(element => element.id === Number(req.params.id)) || { _id: null };
        if (id) {
            List.findByIdAndDelete(id).then(() => {
                res.send({
                    success: true,
                });
            });
        } else {
            res.send({
                success: false,
                error: 'Такого элемента не существует',
            });
        }
    });
});

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
});
