import { NextApiRequest, NextApiResponse } from "next";

const titles = ['Mr', 'Mrs', 'Madam', 'Ma\'am', 'Dr', 'Prof', 'Sir', 'Lady', 'Pastor', 'Apostle', 'Rev',  'Lord', 'Miss', 'Ms'];

export  default  function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({titles: titles, message: 'Titles fetched successfully'});
}
