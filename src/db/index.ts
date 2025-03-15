import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

declare global {
  var pool: Pool | undefined;
}

if (!globalThis.pool) {
  globalThis.pool = new Pool({
    connectionString,
  });
}

const pool = globalThis.pool;

// Handle pool errors
pool.on("error", (err) => {
  console.error("Unexpected error on idle database client", err);
  process.exit(-1);
});

const db = drizzle({ client: pool, schema });

export default db;
