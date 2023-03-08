import { NextFunction, Request, Response } from "express"

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    console.error(err.stack)
    res.json({
        message: err.message
    })
}

