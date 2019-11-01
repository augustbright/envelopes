import express from 'express';
import next from 'next';
import formData from 'express-form-data';
import bodyParser from 'body-parser';
import api from './routes/api';
import cloudinary from 'cloudinary';

export const start = async ({
    NODE_ENV, PORT,
    CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
}) => {
    const app = next({dev: NODE_ENV === 'development'});
    const requestHandler = app.getRequestHandler();

    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET
    });

    await app.prepare();
    const server = express();
    server.use(formData.parse({
        autoClean: false
    }));
    server.use(bodyParser.json());
    server.use('/api', api);
    server.get('*', (req, res) => {
        return requestHandler(req, res);
    });

    server.listen(PORT, error => {
        console.log(`Listening on ${PORT}...`);
    });
};
