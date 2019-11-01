import express from 'express';
import { getCollection } from '../db';
import { ObjectID} from 'mongodb';

const temp = express.Router();

temp.post('/', async (req, res) => {
    const { files } = req;
    const filesArray = Object.values(files);

    const temp = await getCollection('temp');
    const insertion = await temp.insertMany(filesArray);
    res.json(Object.values(insertion.insertedIds));
});

temp.get('/:tempId', async (req, res) => {
    const {params: {tempId}} = req;
    const temp = await getCollection('temp');
    const tempImage = await temp.findOne({_id: ObjectID(tempId)});
    res.sendFile(tempImage.path, {
        headers: {
            'Content-Type': tempImage.type
        }
    });
});

export default temp;