import {Request, Response, NextFunction } from "express";


export function adminOnlyRouteMiddleware(req: Request, res: Response, next: NextFunction){
    
    const user = req.session.isLoggedIn
    if(user){
        req.session.isLoggedIn = true;
        next()
    }
    else{
        res.status(401).redirect('/admin/cms/login')
    }

}