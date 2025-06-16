import {Router, Request, Response} from 'express'
import { CmsController } from '../Controllers/CMSController';

export const CmsRouter = Router();


CmsRouter.get('/', (req: Request, res: Response)=>{res.send("LALAL")})
CmsRouter.post('/upload', CmsController.UploadMedia)

