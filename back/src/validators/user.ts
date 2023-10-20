import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

export const findUser = [
	check('email')
		.trim()
		.notEmpty()
		.withMessage('email field is required')
		.bail()
		.isEmail()
		.withMessage('incorrect email address'),
	check('number')
		.optional()
		.isInt({ min: 100000, max: 999999 })
		.withMessage('number must be a integer and have 6 digits'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array().map(e => e.msg), message: 'Введены некорректные данные' })
		next();
	}
]