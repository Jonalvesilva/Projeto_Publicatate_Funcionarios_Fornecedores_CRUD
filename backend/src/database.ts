import { createPool, sql as sqlObj, DatabasePool } from "slonik";
import "dotenv/config";
require("dotenv").config();

export const sql = sqlObj.unsafe;

let pool: DatabasePool;
const key = process.env.POSTGRES as string;

export async function getPool() {
  if (pool === undefined) {
    pool = await createPool(key);
  }
  return pool;
}
