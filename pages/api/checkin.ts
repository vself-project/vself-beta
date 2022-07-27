import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { mainContractMethodsNew, mainContractName } from '../../utils/contract-methods';
import { checkNearAccount } from '../../utils/near';

const CONTRACT_NAME = 'dev-1658904401423-22477147689565';

/// Call checkin method of the contract managing events
/// Request example: http://localhost:3000/api/checkin?eventid='my_event'&nearid='ilerik.testnet'&qr='some_string'
// http://localhost:3000/api/checkin?eventid='3090415815'&nearid='ilerik.testnet'&qr='some_string'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Parse query
    let { eventid, nearid, qr } = req.query;
    nearid = nearid.slice(1, -1); // trim quotes
    eventid = eventid.slice(1, -1);
    qr = qr.slice(1, -1);

    // Check that near id exists
    nearid = String(nearid).toLowerCase();
    // Switch between MAINNET and TESTNET
    const network_id = nearid.includes('.near') ? 'mainnet' : 'testnet';
    const account_exists = await checkNearAccount(nearid, network_id);
    if (!account_exists) {
      res.status(500).json({
        index: -1,
        got: false,
        title: 'nothing',
        description: 'nothing',
        errorMessage: String(`User ID isn't valid`),
      });
      return;
    }

    // Create contract instance
    const { contract }: any = await getConnectedContract(CONTRACT_NAME, mainContractMethodsNew);

    // Set appropriate gas and storage cost
    const gas_cost = 300000000000000;
    const minting_cost = '25000000000000000000000'; // 0.01 NEAR

    // Call checkin
    let result = await contract
      .checkin({
        args: { event_id: Number(eventid), username: String(nearid), request: String(qr) },
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
    console.log({result});

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
