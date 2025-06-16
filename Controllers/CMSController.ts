import { Request, Response } from "express";
import {ExpressFileUpload } from "../types/blog.types";
import sanitizer from 'sanitize-filename'
import path from "path";
import fs from 'fs'



declare module 'express-serve-static-core' {
    interface Request {
        files?: {
            [fieldname: string]: ExpressFileUpload | ExpressFileUpload[];
        };
    }
}

export class CmsController{
    static async UploadMedia(req:Request, res:Response){
    
        if (!req.files || !req.files.image) {
            res.status(400).json({ message: 'No files uploaded' });
            return;
        }

        const images : ExpressFileUpload[] = Array.isArray(req.files.image) ? req.files.image : [req.files.image] 

        const uploadPath = path.join(__dirname, '..', 'public', 'assets', 'blogs', 'images');
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
}