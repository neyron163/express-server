import { Request, Response } from 'express';
import * as express from 'express';
import { List } from '../models';
import { getElementId, handleError } from '../libs';

export const deleteRouter = express.Router();

deleteRouter.delete('/list/:id', (req: Request, res: Response): void => {
    const { params } = req;

    List.find((err, arr) => {
        if (err) handleError(err, res);

        const id = getElementId(arr, params.id);

        if (id) {
            List.findByIdAndDelete(id).then(() => {
                res.send({
                    success: true,
                });
            });
        } else {
            res.send({
                success: false,
                error: 'Объект не найден.',
            });
        }
    });
});