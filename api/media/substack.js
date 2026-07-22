import { getLatestSubstack } from '../_lib/core.mjs';

export default async function handler(req, res) {
  const { status, body } = await getLatestSubstack();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
  res.status(status).json(body);
}
