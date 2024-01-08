import { NextApiRequest, NextApiResponse } from "next";

const initials = ['Mr', 'Mrs', 'Madam', 'Ma\'am', 'Dr', 'Prof', 'Sir', 'Lady', 'Lord', 'Miss', 'Ms'];

export  default  function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({initials: initials, message: 'Initials fetched successfully'});
}
