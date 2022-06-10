import type { NextApiRequest, NextApiResponse } from 'next';
import { getPowConnectedContract } from '../../utils/pow_contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result: any[] = [];
  const { query } = req;
  const { from_index, limit } = query;
  try {
    const connection: any = await getPowConnectedContract();
    const { contract } = connection;

    const evidences = await contract.get_evidences({
      from_index: Number(from_index),
      limit: Number(limit),
    });
    result = [...evidences];
  } catch (err) {
    res.json({
      err,
    });
  }
  res.status(200).json({ result });
}
