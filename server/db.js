import mongodb from 'mongodb';

const connectionPromise = mongodb.connect(process.env.MONGO_URL);
(async () => {
    try {
        await connectionPromise;
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error(`Could not connect to MongoDB: `, error);
    }
})();

export const getCollection = async (collectionName) => {
    const connection = await connectionPromise;
    const db = await connection.db(process.env.MONGO_DB);
    const collection = await db.collection(collectionName);

    return collection;
};