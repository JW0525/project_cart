import { NextApiRequest, NextApiResponse } from "next";
import coupons from '../utils/coupons'

export default async function get_Products(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const data = coupons;

  switch(method) {
    case 'GET':
      try {
        res.status(200).json(data);
      } catch (err) {
        res.status(400).json({ status: false })
      }
      break;
    default:
      res.status(400).json({ status: false })
      break;
  }
}