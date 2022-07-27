import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethodsNew, mainContractName } from '../../utils/contract-methods';

const CONTRACT_NAME = 'dev-1658904401423-22477147689565';

/// Returns event data
/// Request example: http://localhost:3000/api/status?eventid='my_event'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse query
    let { eventid } = req.query;
    eventid = eventid.slice(1, -1); // trim quotes

    // Create contract instance
    const connection: any = await getConnectedContract(CONTRACT_NAME, mainContractMethodsNew);
    const { contract } = connection;

    // Fetch event data
    const result = await contract.get_event_data({ event_id: Number(eventid) });   // must return event data
    console.log({ result });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(0);
  }
}
