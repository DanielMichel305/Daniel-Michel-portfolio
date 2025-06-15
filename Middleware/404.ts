import {Request, Response, NextFunction} from 'express'

export function NotFoundMiddleware(req: Request, res: Response, next: NextFunction){
    res.status(404).render('404')
}