import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethodsNew, mainContractName } from '../../utils/contract-methods';

const CONTRACT_NAME = 'dev-1658904401423-22477147689565';

/// Returns first 100 events
/// Request example: http://localhost:3000/api/events
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('query: ', req.query);
    
    // Create contract instance
    const connection: any = await getConnectedContract(CONTRACT_NAME, mainContractMethodsNew);
    const { contract } = connection;

    // Fetch event data
    const events = await contract.get_ongoing_events({ from_index: 0, limit: 100 });   // must return events list
    let eventsList = events.map((event: any, index: any) => ({ eventid: event[index], eventName: event[1].event_name, isActive: true }));
    console.log({ eventsList });

    res.status(200).json({ myList: eventsList});
  } catch (err) {
    console.log(err);
    res.status(500).json(null);
  }
}
