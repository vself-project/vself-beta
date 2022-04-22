import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;
    const { data } = query;
    let parsedData = JSON.parse(JSON.stringify(data.slice(1, -1)));
    const { hash } = parsedData;
    parsedData['uploadThrough'] = 'server';
    delete parsedData.hash;
    parsedData = JSON.stringify(parsedData);

    // Create contract instance to use its method
    const contract: any = await getConnectedContract();
    await contract.upload_evidence(
      {
        evidence: {
          media_hash: hash,
          metadata: parsedData,
        },
      },
      '300000000000000' // attached GAS (optional)
    );
    res.status(200).json({ result: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: false, error: 'failed to save evidence' });
  }
}
