import { Request, Response } from "express";
import {ExpressFileUpload } from "../types/blog.types";
import sanitizer from 'sanitize-filename'
import path from "path";
import fs from 'fs'
import { BlogPost } from "../Models/blogpost";
import { Topic } from "../Models/topics";



declare module 'express-serve-static-core' {
    interface Request {
        files?: {
            [fieldname: string]: ExpressFileUpload | ExpressFileUpload[];
        };
    }
}

export class CmsController{

    static getLoginPage(req: Request, res: Response){
        res.render('login')
    }

    static async loginUser(req: Request, res: Response){
        const {username,password} = req.body;

        if(!username || !password){
            res.status(400).end('username and passowrd required')
        }
        if(username == process.env.CMS_USRNAME as string && password === process.env.CMS_PASS as string){
            req.session.isLoggedIn = true;
            res.status(200).redirect('/admin/cms')
            
        }
        else{
            req.session.isLoggedIn = false;
            res.status(401).end('Username and password incorrect')
        }
        
    }
    static async logoutUser(req: Request, res: Response){
        req.session.isLoggedIn = false;
        req.session.destroy(()=>{
            res.redirect('/')
        });
    }

    static async UploadMedia(req:Request, res:Response){
        
       
        if (!req.files || !req.files.image) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        const images : ExpressFileUpload[] = Array.isArray(req.files.image) ? req.files.image : [req.files.image] 

        const uploadPath = path.join(__dirname, '..', '..' ,'public', 'assets', 'blogs', 'images');
        fs.mkdirSync(uploadPath, {recursive : true})

        const allowedMimetypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

        for(const image of images){
            if (!allowedMimetypes.includes(image.mimetype)) {
                res.status(400).json({ message: `File type ${image.mimetype} is not allowed.` });
                return;
            }
            const fileName = sanitizer(image.name)
            image.mv(path.join(uploadPath, fileName), function(err){
                if(err){
                    res.status(500).json({'message' : 'Failed to upload, Server Error'})
                }
            })
             
        }
        res.status(200).json({"message" : "Image Uploaded"})



    }
    static async GetDashboard(req: Request, res:Response){
        const allBlogs = await BlogPost.findAll({order : [['createdAt', 'DESC']]})
        
        res.render('dashboard', {blogs: allBlogs})
    }

    static async editBlogPage(req:Request, res: Response){

        const {blog_id} = req.params;

        if(!blog_id){
            res.status(404).end()
        }
        try {
             const blog = await BlogPost.findOne({where : 
            {
                blog_id : blog_id
            },
            include : {
                model : Topic,
                attributes : ['topic'],
                through : {
                        attributes:[]
                    }
            }}) as (BlogPost & {topics : Topic[]});

            if(!blog){
                res.status(404).end()
            }
            else{
                res.status(200).render('editblog', {blog : blog})
            }

            
        } catch (error) {
            console.log(`[ERORR] ${error}`)
            res.status(500).end()
        }

       
    }

    static async modifyBlogContent(req: Request, res: Response){
        const {blog_id} = req.params;

         if(!blog_id){
            res.status(404).end()
            return;
        }


        const allowedFieldsToBeChanged = ['blog_id', 'blogTitle', 'blog_description', 'markdown_source', 'topics']
        let updatedFields = {}

        for(const field in req.body){
            if(allowedFieldsToBeChanged.includes(field)){
                updatedFields[field] = req.body[field]
            }
            else{
                res.status(400).end()
                return;
            }
        }
       
        
        try {
            const blog = await BlogPost.findByPk(blog_id);
            if(!blog){
                res.status(404).end()
                return;
            }

            await blog.update(updatedFields,
            {
                where : {
                    blog_id : blog_id
                }
            })

            if(updatedFields['topics'] && Array.isArray(updatedFields['topics'])){

                const topics = updatedFields['topics'].map(topic => ({ topic }));

                await Topic.bulkCreate(topics, {ignoreDuplicates : true})

                await blog.setTopics(updatedFields['topics']);
            }
            res.status(200).end()
            
        } catch (error) {
            console.log(`[ERORR] ${error}`)
            res.status(500).end()
        }
       

    }
    static async deleteBlogPost(req: Request, res: Response){

        const {blog_id} = req.params;
        if(!blog_id){
            res.status(400).end()
        }

        try {
            await BlogPost.destroy({where : {blog_id : blog_id}})
            res.status(200).end('Blog Deleted');


        } catch (error) {
            res.status(500).end('Server Error!')
        }

    }


}