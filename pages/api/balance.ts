import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethods, mainContractName } from '../../utils/contract-methods';

/// Return user balance or NFTs list
/// Request examples:
/// -- http://localhost:3000/api/balance
/// -- http://localhost:3000/api/balance?nearid='ilerik.testnet'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getConnectedContract(mainContractName, mainContractMethods);
    const { contract } = connection;

    // Parse query
    let result = 'None';
    let { nearid } = req.query;

    // If username is provided we need to return user balance
    if (nearid) {
      // Extract account id
      nearid = String(nearid).toLowerCase();
      const account_id = nearid.slice(1, -1);
      console.log('Account ID: ', account_id);
      const balance_data = await contract.get_user_balance_extra({ account_id });
      result = balance_data;
    } else {
      // If username isn't provided then we need to return list of NFTs
      const event_data = await contract.get_event_data();
      console.log('Event Data: ', event_data);
      result = event_data.quests.map((quest: any) => quest.reward_uri);
    }

    // Return result
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(200).send(null);
  }
}
