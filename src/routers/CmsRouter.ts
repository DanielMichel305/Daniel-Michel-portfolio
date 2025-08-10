import {Router, Request, Response} from 'express'
import { CmsController } from '../Controllers/CMSController';
import { NotFoundMiddleware } from '../Middleware/404';
import { adminOnlyRouteMiddleware } from '../Middleware/adminOnlyRoute';

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


CmsRouter.get('/', adminOnlyRouteMiddleware,CmsController.GetDashboard)
CmsRouter.get('/edit/:blog_id',adminOnlyRouteMiddleware, CmsController.editBlogPage)
CmsRouter.post('/upload',adminOnlyRouteMiddleware, CmsController.UploadMedia)
CmsRouter.patch('/edit/:blog_id',adminOnlyRouteMiddleware, CmsController.modifyBlogContent)
CmsRouter.delete('/:blog_id', adminOnlyRouteMiddleware,CmsController.deleteBlogPost)

CmsRouter.get('/login', CmsController.getLoginPage)
CmsRouter.post('/login', CmsController.loginUser)
CmsRouter.get('/logout', CmsController.logoutUser)

CmsRouter.get('/assetlib', CmsController.getAssetLibrary);

CmsRouter.use(NotFoundMiddleware);