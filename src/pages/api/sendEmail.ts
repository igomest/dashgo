import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, message } = req.body
  const msg = {
    to: 'test@example.com',
    from: email,
    text: message,
    subject: 'Sending with SendGrid is Fun',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',

  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: 'Error sending email' })
  }
}