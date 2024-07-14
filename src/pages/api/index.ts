import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;

    // Read cookies
    const myCookie = cookies['myCookie'];

    // Do something with the cookie value
    console.log('Value of myCookie:', myCookie);

    // Send a response
    res.status(200).json({ message: 'Cookie value received' });
}