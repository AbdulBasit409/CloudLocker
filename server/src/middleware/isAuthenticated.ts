import { Request, Response, NextFunction } from "express"

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.status(401).json({
            error: "unauthenticated",
        })
    }
}