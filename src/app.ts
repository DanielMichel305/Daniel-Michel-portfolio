import express, {Application, Request,Response} from 'express'
import Session  from 'express-session';
import { BlogController } from './Controllers/blogController';
import { NotFoundMiddleware } from './Middleware/404';

import createMemoryStore from 'memorystore'

import fileUpload from 'express-fileupload'
import path from 'path'


import './Models/blogPostTopics'
import { CmsRouter } from './routers/CmsRouter';



require('dotenv').config()

const app: Application = express(); 


app.use(fileUpload())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))


const sessionMemoryStore = createMemoryStore(Session)

app.use(Session({
  secret: process.env.SESSION_KEY as string,
  resave: false,
  saveUninitialized: true,
  store : new sessionMemoryStore({
    checkPeriod : 2 * 1000 * 1000 * 1000
  }),
  cookie: { 
    httpOnly: true,
    secure: process.env.ENVIROMENT === "PROD"
  } 
}));



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'Views'))

app.use('/admin/cms', CmsRouter)





app.get('/blogs', BlogController.getAllBlogs)
app.get('/minigame', BlogController.getMiniGame)
app.get('/b/:blogId', BlogController.getBlogById)
app.post('/create', BlogController.createNewBlogPost)


app.get('/', (req: Request, res: Response)=>{
    res.render('about')
})


app.get('/projects', (req: Request, res: Response)=>{
  res.render('projects')
})

app.use(NotFoundMiddleware);

app.listen(8080, ()=>{
    console.log(`Server Starting on http://localhost:8080`)
})