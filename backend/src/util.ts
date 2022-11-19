import { Handler, NextFunction, Request, Response } from 'express'

export function asyncHandler(
	callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
): Handler {
	return function (req: Request, res: Response, next: NextFunction) {
		callback(req, res, next).catch(next)
	}
}
