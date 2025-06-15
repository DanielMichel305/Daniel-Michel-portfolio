import {Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from '@sequelize/core'
import {sequelize} from '../db/db'
import { Topic } from './topics';

export class BlogPost extends Model<InferAttributes<BlogPost>, InferCreationAttributes<BlogPost>>{
    declare blog_id : string;
    declare blogTitle: string;
    declare blogDescription : string 
    declare markdown_source : string;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    public readonly Topics?: Topic[];

}
BlogPost.init({
    blog_id : {
        type : DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    blogTitle : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    blogDescription : {
        type : DataTypes.STRING,
        allowNull : true

    },
    markdown_source : {
        type : DataTypes.STRING,
        allowNull : false
    }

},{
    sequelize,
    tableName : 'blog_posts'
});

//(async()=>{await BlogPost.sync({alter : true})})()

//BlogPost.sync({alter : true});