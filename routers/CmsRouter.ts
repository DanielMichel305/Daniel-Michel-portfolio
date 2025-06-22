import {Router, Request, Response} from 'express'
import { CmsController } from '../Controllers/CMSController';

export const CmsRouter = Router();


/*
- Auth Middleware using env vars for this proj.
- Work on the blog Dashboard
- Fix DB migrations
- Move root level routes to /blogs
- Modify Navbar buttons to be blog, portfolio, contact, etc..and add actual links 
- Start working on Main Page
- Deploy
*/


CmsRouter.get('/', CmsController.GetDashboard)
CmsRouter.get('/edit/:blog_id', CmsController.editBlogPage)
CmsRouter.post('/upload', CmsController.UploadMedia)
CmsRouter.patch('/edit/:blog_id', CmsController.modifyBlogContent)

