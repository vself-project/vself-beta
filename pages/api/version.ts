import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventsConnectedContract } from '../../utils/events-contract';

/// Return version of vself event contract
/// Request example: http://localhost:3000/api/version
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getEventsConnectedContract();
    const { contract } = connection;

    // Fetch contract version
    const result = await contract.version();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'failed to fetch contract version' });
  }
}
