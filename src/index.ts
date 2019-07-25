import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { deleteRouter, getRouter, postRouter } from './routes/';
import { API, mongoDB } from './constants';

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect(mongoDB, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    err => {
        console.log('Can not connect to the database' + err);
    },
);
mongoose.set('useFindAndModify', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(API, getRouter);
app.use(API, postRouter);
app.use(API, deleteRouter);

app.listen(PORT, () => {
    console.log('server started at http://localhost:' + PORT);
});
