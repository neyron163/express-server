import { Request, Response } from 'express';
import { List } from '../models';
import { getElementId } from '../libs';
import * as express from 'express';

export const postRouter = express.Router();

postRouter.post('/list/:id', (req: Request, res: Response) => {
    const { params } = req;
    const { title } = req.body;
    List.find((err, arr) => {
        const id = getElementId(arr, params.id);

        List.findByIdAndUpdate(id, { title }, (err, result) => {
            if (result && title) {
                res.send({
                    success: true,
                });
            } else {
                res.send({
                    success: false,
                    title: 'Заголовок не может быть пустым.',
                });
            }
        });
    });
});

postRouter.post('/list', (req: Request, res: Response) => {
    const { title } = req.body;
    List.find((err, arr) => {
        const index = arr.map(element => element.id).sort();
        List.create({ title, id: index[index.length - 1] + 1 || 0 });
    }).then(arr => {
        const index = arr.map(element => element.id).sort();
        res.send({
            id: index[index.length - 1] + 1 || 0,
        });
    });
});
