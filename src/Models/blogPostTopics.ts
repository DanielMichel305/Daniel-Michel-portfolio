import {Sequelize, Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional} from '@sequelize/core'
import {sequelize} from '../db/db'
import { BlogPost } from './blogpost';
import { Topic } from './topics';




export class BlogPostTopic extends Model<InferAttributes<BlogPostTopic>, InferCreationAttributes<BlogPostTopic>>{
    declare blog_id : string;
    declare topic_name: string ;

}
BlogPostTopic.init({
    blog_id : {
        type : DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: BlogPost,
            key: 'blog_id'
        }
    },
    topic_name : {
        type: DataTypes.STRING,
        //allowNull: false,
        primaryKey: true,
        references: {
            model: Topic,
            key: 'topic'
        }
    }
},{
    sequelize,
    tableName : 'blog_post_topics'
})

Topic.belongsToMany(BlogPost, {
    through : BlogPostTopic,
    foreignKey : 'topic_name',
    otherKey : 'blog_id',
    as : 'blogPosts'
});
BlogPost.belongsToMany(Topic, {
    through : BlogPostTopic,
    foreignKey : 'blog_id',
    otherKey : 'topic_name',
    as : 'topics'
});


//BlogPostTopic.sync({force:true})



//(async ()=>{await BlogPostTopic.sync({alter : true})})()