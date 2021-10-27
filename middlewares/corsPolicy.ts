import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {DefaultResponse} from '../types/DefaultResponse';
import NextCors from 'nextjs-cors';

const corsPolicy = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<DefaultResponse>) => {
        await NextCors(req, res, {
            methods: ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE'],
            origin: '*',
            optionsSuccessStatus: 200,
        });
        return handler(req, res);
    }

export {corsPolicy}