import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    id: Number,
    title: String,
});

export const List = mongoose.model('list', ListSchema);
