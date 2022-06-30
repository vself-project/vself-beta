import type { NextApiRequest, NextApiResponse } from 'next';
import { getEventsConnectedContract } from '../../utils/events-contract';

/// Call checkin method of the contract managing events
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let result = "None";

    // Create contract instance
    const connection: any = await getEventsConnectedContract();
    const { contract } = connection;

    // Parse query
    let { nearid, qr } = req.query;
    console.log("Query: ", req.query);
    nearid = nearid.slice(1, -1); // trim quotes
    qr = qr.slice(1, -1);

    // Set appropriate gas and storage cost
    const gas_cost = 300000000000000;
    const minting_cost = "10000000000000000000000";    // 0.01 NEAR
    console.log("Incoming action: {} {}", nearid, qr);

    // Call checkin
    result = await contract.checkin({
      args: { username: String(nearid), request: String(qr) },
      gas: gas_cost,
      amount: minting_cost,
    }).catch((err: any) => {
      console.log(err);
      res.status(500).json({
        index: -1,
        got: false,
        title: "nothing",
        description: "nothing",
        errorMessage: String(err),
      });
      return;
    })
    console.log('Result: ', result);

    // Special case
    if (result === null) {
      res.json({
        index: -1,
        got: false,
        title: "nothing",
        description: "nothing",
      });
      return;
    }

    // Success
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      index: -1,
      got: false,
      error: true,
      title: "nothing",
      description: "nothing",
      errorMessage: String(err),
    });
  }
}
