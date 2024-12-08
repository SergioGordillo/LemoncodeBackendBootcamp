import {Db, MongoClient} from 'mongodb';

export let db: Db; 

export const connectToDBServer = async(connectionURI: string) => {
    const client = new MongoClient(connectionURI);
    await client.connect();

    db=client.db();
}

export const ensureMongoDBURI = (value: string | undefined): string => {
    if (!value) {
      throw new Error("MongoDB URI is not defined");
    }
    return value;
}