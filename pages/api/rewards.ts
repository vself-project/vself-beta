import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

/// Return list of NFT rewards
/// Request example: http://localhost:3000/api/rewards
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getConnectedContract(mainContractName, mainContractMethods);
    const { contract } = connection;

    // Fetch event data
    let result = [];
    const event_data = await contract.get_event_data();
    console.log('Event Data: ', event_data);
    result = event_data.quests.map((quest: any) => quest.reward_uri);

    // Response
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json([]);
  }
}
