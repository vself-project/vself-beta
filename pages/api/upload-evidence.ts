import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const { data } = query;
    let parsedData = JSON.parse(String(data.slice(1, -1)));
    const { hash } = parsedData;
    parsedData['uploadThrough'] = 'server';
    delete parsedData.hash;
    parsedData = JSON.stringify(parsedData);

    // Create contract instance to use its method
    const connection: any = await getConnectedContract();
    const { contract, account } = connection;
    const { transaction } = await account.functionCall({
      contractId: contract.contractId,
      methodName: 'upload_evidence',
      args: {
        evidence: {
          media_hash: hash,
          metadata: parsedData,
        },
      },
      gas: '300000000000000',
    });
    res.status(200).json({ result: true, trxHash: transaction.hash });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: false, error: 'failed to save evidence' });
  }
}
