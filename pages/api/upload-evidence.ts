import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppRouter } from './trpc/[trpc]';
import { createTRPCClient } from '@trpc/client';
import { getConnectedContract } from '../../utils/contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { query } = req;
        const { data } = query;
        console.log('Query: ', data );
        const parsedData = JSON.parse(data.slice(1, -1));
        console.log(parsedData);
        const { hash, name, time, location } = parsedData;
        parsedData['uploadThrough'] = 'server';
        delete parsedData.hash;
        console.log(parsedData);
        const contract = await getConnectedContract();
        await contract.upload_evidence(
        {
          evidence: {
            media_hash: hash,
            metadata: JSON.stringify({
              author: 'Serg',
              uploadThrough: 'server',
            }),
          },
        },
        "300000000000000" // attached GAS (optional)
      );
      let response = await contract.get_evidences({
        from_index: 10,
        limit: 10
      });
      console.log(response);
      res.status(200).json({ result: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: false, error: 'failed to save evidence' });
    }
}