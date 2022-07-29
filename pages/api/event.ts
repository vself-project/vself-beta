import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethodsNew, mainContractName } from '../../utils/contract-methods';

const CONTRACT_NAME = 'dev-1658904401423-22477147689565';

/// Returns event data
/// Request example: http://localhost:3000/api/event?eventid='my_event'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse query
    let { eventid } = req.query;
    eventid = eventid.slice(1, -1); // trim quotes

    // Create contract instance
    const connection: any = await getConnectedContract(CONTRACT_NAME, mainContractMethodsNew);
    const { contract } = connection;

    // Fetch event data
    const event = await contract.get_event_data({ event_id: Number(eventid) });   // must return event data
    if (event === null) {
      res.status(200).json(null);
      return;
    }
    let rewardUris = event.quests.map((quest: any) => quest.reward_uri);
    let result = { 
      eventid: Number(eventid),
      isActive: true,
      eventName: event.event_name,
      eventDescription: event.event_description,
      rewardLinks: rewardUris
    };

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(null);
  }
}
