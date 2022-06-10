import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result = false;
  const { query } = req;
  const { nearid } = query;
  try {
    const connection: any = await getConnectedContract();
    const { contract } = connection;
    const tokenId = await contract.send_reward({
      args: { username: nearid },
      gas: '300000000000000',
      amount: '10000000000000000000000',
    });
    result = tokenId;
  } catch (err) {
    res.json({
      err,
    });
  }
  res.json(result);
}
