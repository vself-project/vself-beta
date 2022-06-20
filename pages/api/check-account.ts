import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let result = false;
  const { query } = req;
  const { nearid } = query;
  try {
    const response = await fetch('https://explorer.mainnet.near.org/accounts/' + nearid);
    const resText = await response.text();
    result = !resText.includes('check if the account name');
  } catch (err) {
    res.json({
      err,
    });
  }
  res.json(result);
}
