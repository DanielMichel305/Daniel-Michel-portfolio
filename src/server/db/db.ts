import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';


import path from 'path'

/** @type {import('@sequelize/core').Sequelize} */
export const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: path.resolve(__dirname, 'database.db'),
  foreignKeys: true,
  
});






//sequelize.sync({force: true})  ///REMOVE FOR PROD