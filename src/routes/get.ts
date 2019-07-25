import { Request, Response } from 'express';
import { List } from '../models';
import { handleError } from '../libs';
import * as express from 'express';

export const getRouter = express.Router();

getRouter.get('/list', (req: Request, res: Response) => {
    List.find((err, arr) => {
        if (err) handleError(err, res);

        const { length } = arr;
        res.send({
            data: arr,
            length,
            success: true,
            error: '',
        });
    });
});
