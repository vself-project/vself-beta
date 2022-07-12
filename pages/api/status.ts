import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

/// Return number of quests in current event
/// Request example: http://localhost:3000/api/status
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getConnectedContract(mainContractName, mainContractMethods);
    const { contract } = connection;

    // Fetch event data
    const result = await contract.get_event_data();
    res.status(200).json(result.quests.length);
  } catch (err) {
    res.status(500).json(0);
  }
}
