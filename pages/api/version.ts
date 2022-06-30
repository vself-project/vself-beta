import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventsConnectedContract } from '../../utils/events-contract';

/// Return version of vself event contract
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getEventsConnectedContract();
    const { contract } = connection;

    // Fetch contract version
    let result = await contract.version();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch contract version' });
  }
}
