'use strict';

import * as fsp from 'node:fs/promises';
import * as path from 'node:path';
import * as pg from 'pg';

const DB = path.join(process.cwd(), './db');

const read = (name) => fsp.readFile(path.join(DB, name), 'utf8');

const execute = async (client, sql) => {
  try {
    await client.query(sql);
  } catch (err) {
    console.error(err);
  }
};

const notEmpty = (s) => s.trim() !== '';

const executeFile = async (client, name) => {
  console.log(`Execute file: ${name}`);
  const sql = await read(name);
  const commands = sql.split(';\n').filter(notEmpty);
  for (const command of commands) {
    await execute(client, command);
  }
};

export default async (config: { database: any; pg: any }) => {
  console.log('Setup environment');
  const inst = new pg.Client({ ...config.database, ...config.pg });
  await inst.connect();

  await executeFile(inst, 'install.sql');
  console.log('Install is done');
  await inst.end();

  const db = new pg.Client(config.database);
  await db.connect();
  await executeFile(db, 'structure.sql');
  console.log('Structures was created');

  await db.end();
  console.log('Environment is ready');
};
