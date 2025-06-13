import express, {Application, Request,Response} from 'express'
import { BlogController } from './Controllers/blogController';
import path from 'path'
import ejs from 'ejs'

import './Models/blogPostTopics'

require('dotenv').config()

const app: Application = express(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'Public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

app.get('/', BlogController.getAllBlogs)
app.get('/:blogId', BlogController.getBlogById)
app.post('/create', BlogController.createNewBlogPost)


app.listen(8080, ()=>{
    console.log(`Server Starting on http://localhost:8080`)
})