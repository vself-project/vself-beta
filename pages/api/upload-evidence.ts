import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppRouter } from './trpc/[trpc]';
import { createTRPCClient } from '@trpc/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { query } = req;
        console.log( query );
        const client = createTRPCClient<AppRouter>({
            url: 'http://localhost:3000/api/trpc',
          });
                
        const result = await client.query(['upload-evidence', { data: 'my data' }]);
        res.status(200).json({ result });
    } catch (err) {
        res.status(500).json({ error: 'failed to save evidence' });
    }
}