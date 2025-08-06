/*import { input, select } from '@inquirer/prompts';
import { envConstants } from "#core/constants/index.js";
import { createRestApiServer } from "#core/servers/index.js";

const connectionURL = await input({
  message: "Connection URL (Press enter to use default):",
  default: envConstants.MONGODB_URI,
});
console.log("Connecting to database...");
await createRestApiServer();

let exit = false;
while (!exit) {
  const consoleRunner = await select({
    message: "Which console-runner do you want to run?",
    choices: [
      { name: "seed-data", value: "seed-data" },
      { name: "exit", value: "exit" },
    ],
  });

  if (consoleRunner !== "exit") {
    const { run } = await import(`./${consoleRunner}.runner.js`);
    await run();
  } else {
    exit = true;
    await dbServer.disconnect();
  }
}*/

// tools/restore-db.ts

import fs from "fs/promises";
import path from "path";
import { MongoClient } from "mongodb";
import { deserialize } from "bson";
import { confirm } from "@inquirer/prompts";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017";
const DB_NAME = "airbnb";
const COLLECTIONS = ["listingsAndReviews"];
const BACKUP_DIR = path.resolve("rentaroomdb");

async function loadBson(filePath: string) {
  const buffer = await fs.readFile(filePath); // Binary lecture
  const documents: any[] = [];
  let offset = 0;

  while (offset < buffer.length) {
    const docSize = buffer.readInt32LE(offset); // Doc Length
    const docBuffer = buffer.slice(offset, offset + docSize);
    const doc = deserialize(docBuffer);
    documents.push(doc);
    offset += docSize;
  }

  return documents;
}

async function restore() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  console.log(`🔄 Restoring DDBB "${DB_NAME}" from ${BACKUP_DIR}`);

  const shouldClear = await confirm({
    message: "Do you want to delete the existing data before restoring?",
    default: true,
  });

  for (const name of COLLECTIONS) {
    const collection = db.collection(name);

    if (shouldClear) {
      const deleteResult = await collection.deleteMany({});
      console.log(
        `🗑️  Deleted ${deleteResult.deletedCount} documents from "${name}"`
      );
    }

    const filePath = path.join(BACKUP_DIR, `${name}.bson`);
    const data = await loadBson(filePath);

    if (Array.isArray(data)) {
      const insertResult = await collection.insertMany(data);
      console.log(
        `✅ Inserted ${insertResult.insertedCount} documents in "${name}"`
      );
    } else {
      console.warn(`⚠️  The file ${filePath} is not a valid array`);
    }
  }

  await client.close();
  console.log("🎉 Completed restoring");
}

restore().catch((error) => {
  console.error("❌ Error while restoring:", error);
  process.exit(1);
});
