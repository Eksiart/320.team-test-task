import { Request, Response } from 'express';
import { User } from "@/models/user";

import users from '../../db/users.json';

interface execReq {
	timerId: ReturnType<typeof setTimeout>;
	response: Response;
}

const executingRequests: Record<string, execReq> = {};

export const findUser = async (req: Request<{}, {}, {}, User>, res: Response) => {
	const { email, number } = req.query;
	const { id } = req.session;
	console.log(id)

	if (id in executingRequests) {
		clearTimeout(executingRequests[id].timerId);
		console.log('rejected')
		executingRequests[id].response
			.status(409)
			.send({ message: 'Request aborted by new request!' });
	}

	const timerId = setTimeout(() => {
		const filteredUsers = users.filter(u => {
			return u.email === email && (!number || u.number === String(number));
		})
		res.status(200).send({ users: filteredUsers })
		delete executingRequests[id];
	}, 5000);

	executingRequests[id] = {
		timerId: timerId,
		response: res,
	}
}