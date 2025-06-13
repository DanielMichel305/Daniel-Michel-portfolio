import {Request,Response} from 'express'
import { BlogPost } from '../Models/blogpost'
import { Topic } from '../Models/topics'
import { BlogRenderSchema, CreateBlogRequestSchema } from '../types/blog.types'
import Showdown from 'showdown'
import { UniqueConstraintError } from '@sequelize/core';

export class BlogController{
    static async getAllBlogs(req: Request, res: Response){
        try{
            const blogs = await BlogPost.findAll({
                attributes: [
                    'blog_id',
                    'blogTitle'
                ], 
                include : {
                    model : Topic,
                    attributes : ['topic'],
                    through : {attributes:[]
                    }
                },
                limit:10})

            res.status(200).json(blogs);
        }catch(err){
            console.log(err)
            res.status(500).send("Server Erorr!")
        }
        
        
    }
    static async createNewBlogPost(req:Request, res: Response){
        const blog_data: CreateBlogRequestSchema = req.body;

        try {
            const blog_post = await BlogPost.create({
            blog_id:blog_data.blog_data.blog_id, 
            blogTitle : blog_data.blog_data.blogTitle,
            markdown_source : blog_data.blog_data.markdown_source
            })

        let blogTopics :Topic[]  = []
        for (const topic of blog_data.topics){
            const [topicName] = await Topic.findOrCreate({
                    where: { topic: topic }
                });
                blogTopics.push(topicName);
            
        }
       
        
        await blog_post.addTopics(blogTopics) ///This is a magic function added by sequelize at runtime...Typescript is loosing it's mind bas it works

        res.status(200).json({"message" : "Blog Created!"})

        } catch (error) {
            if(error instanceof UniqueConstraintError){
                res.status(400).json({"message" : "Blog With same Id already Exists"})
            }
            else{
                console.log(`[DB Error] ${error}`)
                res.status(500).json({"message" : "Server Error!"})
            }
        }
        
    }
    static async getBlogById(req:Request, res:Response){
        const {blogId} = req.params
        const blog = await BlogPost.findOne({
            where : {
                blog_id : blogId
            },
            include : {
                model : Topic,
                attributes : ['topic'],
                through : {attributes:[]}
            }
        }) as BlogPost & {topics : Topic[]}
        if(!blog){
            ///404
            res.status(404).send("Blog does not exist or was moved.");
        }
        else{
            let converter =  new Showdown.Converter({headerLevelStart : 2});
            converter.setFlavor('github')
            const renderedBlogContent = converter.makeHtml(blog.markdown_source);   

            res.status(200).render('blog', {
                title : blog.blogTitle,
                created_at : blog.createdAt.toDateString(),
                topics : blog.topics,
                blog_content : renderedBlogContent
            });
        }
        
    }
}

