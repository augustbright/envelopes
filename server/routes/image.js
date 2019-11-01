import express from 'express';
import { ObjectID } from 'mongodb';
import cloudinari from 'cloudinary';
import { getCollection } from '../db';

const image = express.Router();

image.post('/', async (req, res) => {
    const { body: { tempId, text } } = req;
    const temp = await getCollection('temp');
    const envelopes = await getCollection('envelopes');
    const tempImage = await temp.findOne({ _id: ObjectID(tempId) });
    const uploadResult = await cloudinari.uploader.upload(tempImage.path);
    const insertion = await envelopes.insertOne({text, image: uploadResult});
    res.json(insertion.insertedId);
});

image.get('/:envelopeId', async (req, res) => {
    const { params: { envelopeId } } = req;
    const envelopes = await getCollection('envelopes');
    const envelope = await envelopes.findOne({ _id: ObjectID(envelopeId) });

    res.json(envelope);
});

export default image;