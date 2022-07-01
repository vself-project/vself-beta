import type { NextApiRequest, NextApiResponse } from 'next';
import { checkNearAccount } from '../../utils';

/// Check that near id exists
/// http://localhost:3000/api/check-account?nearid=ilerik.testnet
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result = false;
  const { query } = req;
  const { nearid } = query;
  try {
    // Switch between MAINNET and TESTNET
    let result_m = false;
    //result_m = await checkNearAccount(nearid, 'mainnet');
    let result_t = false;
    result_t = await checkNearAccount(nearid, 'testnet');
    result = result_m || result_t;
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
  res.status(200).json(result);
}
