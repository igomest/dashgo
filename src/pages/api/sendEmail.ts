import sgMail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendEMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, message } = req.body;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: 'dashgo.bot@gmail.com', // Change to your verified sender
    to: email, // Change to your recipient
    subject: "Sending with SendGrid is Fun",
    text: message,
    html: `
       <p>${message}</p>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.json({
        success: true,
      })
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      res.json({
        success: false,
      });
    });
}
