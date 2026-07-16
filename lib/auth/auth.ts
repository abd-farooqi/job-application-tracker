import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";

const client = new MongoClient(process.env.MONGODB_URI!);
console.log(client, client.db);
const db = client.db();
console.log(db);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
});

export async function getSession() {
  const result = await auth.api.getSession({
    headers: await headers(),
  });
}
