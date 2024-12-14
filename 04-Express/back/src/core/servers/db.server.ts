import { Db, MongoClient } from "mongodb";

let client: MongoClient;

const connect = async (connectionURL: string) => {
  client = new MongoClient(connectionURL);
  await client.connect();
  dbServer.db = client.db();
};

const disconnect = async () => {
  await client.close();
};

interface DBServer {
  connect: (connectionURL: string) => Promise<void>;
  disconnect: () => Promise<void>;
  db: Db;
}

export let dbServer: DBServer = {
  connect,
  disconnect,
  get db() {
    if (!client) {
      throw new Error("Database not connected. Call 'connect' first.");
    }
    return client.db();
  },
};
export const ensureMongoDBURI = (value: string | undefined): string => {
  if (!value) {
    throw new Error("MongoDB URI is not defined");
  }
  return value;
};
