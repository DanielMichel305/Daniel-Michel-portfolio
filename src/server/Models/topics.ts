import {Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from '@sequelize/core'
import {sequelize} from '../db/db'

export class Topic extends Model<InferAttributes<Topic>, InferCreationAttributes<Topic>>{
    declare topic : string;

}
Topic.init({
    topic : {
        type : DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
},{
    sequelize,
    tableName : 'topics'
});

//(async ()=>{await Topic.sync({alter : true})})()
//Topic.sync({alter : true});