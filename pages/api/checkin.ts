import type { NextApiRequest, NextApiResponse } from 'next';
import { checkNearAccount } from '../../utils';
import { getEventsConnectedContract } from '../../utils/events-contract';

/// Call checkin method of the contract managing events
/// Request example: http://localhost:3000/api/checkin?nearid='ilerik.testnet'&qr='some_qr_coded_string'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let result = 'None';

    // Parse query
    let { nearid, qr } = req.query;
    console.log('Query: ', req.query);
    nearid = nearid.slice(1, -1); // trim quotes
    qr = qr.slice(1, -1);

    // Check that near id exists
    nearid = String(nearid).toLowerCase();
    // Switch between MAINNET and TESTNET
    const account_exists = await checkNearAccount(nearid, 'mainnet');
    if (!account_exists) {
      res.status(500).json({
        index: -1,
        got: false,
        title: 'nothing',
        description: 'nothing',
        errorMessage: String('User ID isn&amp;t valid'),
      });
      return;
    }

    // Create contract instance
    const connection: any = await getEventsConnectedContract();
    const { contract } = connection;

    // Set appropriate gas and storage cost
    const gas_cost = 300000000000000;
    const minting_cost = '25000000000000000000000'; // 0.01 NEAR
    console.log('Incoming action: {} {}', nearid, qr);

    // Call checkin
    result = await contract
      .checkin({
        args: { username: String(nearid), request: String(qr) },
        gas: gas_cost,
        amount: minting_cost,
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({
          index: -1,
          got: false,
          title: 'nothing',
          description: 'nothing',
          errorMessage: String(err),
        });
        return;
      });
    console.log('Result: ', result);

    // Special case
    if (result === null) {
      res.json({
        index: -1,
        got: false,
        title: 'nothing',
        description: 'nothing',
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
      title: 'nothing',
      description: 'nothing',
      errorMessage: String(err),
    });
  }
}
