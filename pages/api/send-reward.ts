import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let tokenId = false;
  const { query } = req;
  const { nearid } = query;
  try {
    const connection: any = await getConnectedContract();
    const { contract } = connection;
    tokenId = await contract.send_reward({
      args: { username: nearid },
      gas: '300000000000000',
      amount: '10000000000000000000000',
    });
  } catch (err) {
    res.json({
      err,
    });
  }
  res.status(200).json({ tokenId });
}
