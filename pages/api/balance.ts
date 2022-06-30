import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventsConnectedContract } from '../../utils/events-contract';

/// Return user balance or NFTs list
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create contract instance
    const connection: any = await getEventsConnectedContract();
    const { contract } = connection;

    // Parse query
    let result = "None";
    let { nearid } = req.query;

    // If username is provided we need to return user balance
    if (nearid) {
      // Extract account id
      let account_id = nearid.slice(1, -1);
      console.log("Account ID: ", account_id);
      const balance_data = await contract.get_user_balance_extra({ account_id });
      result = balance_data;
    } else {
      // If username isn't provided then we need to return list of NFTs
      const event_data = await contract.get_event_data();
      console.log("Event Data: ", event_data);
      result = event_data.quests.map((quest: any) => quest.reward_uri);
    }

    // Return result
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(200).send(null);
  }
}
