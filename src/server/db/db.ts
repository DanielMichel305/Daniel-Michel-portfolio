import { Sequelize} from '@sequelize/core'
import {SqliteDialect} from '@sequelize/sqlite3'
import path from 'path'



// const sequelize = new Sequelize({
//   dialect: 'sqlite3',
//   storage: path.resolve(__dirname, 'database.db'), 
// });


const sequelize = new Sequelize({
  dialect: SqliteDialect,
  storage: path.resolve(__dirname, 'database.db'),
  foreignKeys: true  
});


sequelize.query('PRAGMA foreign_keys = ON;').then(()=>{}).catch((err)=>{
    console.error('Error enabling foreign key constraints:', err);
});

export {sequelize}


//sequelize.sync({force: true})  ///REMOVE FOR PROD