import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // reste false car on utilise TLS START
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_KEY_BREVO,
  },
  disableUrlAccess: false,
  disableFileAccess: false,
});

export async function sendLoginEmail(to, loginLink) {
  await transporter.sendMail({
    from: "sodouessodina@gmail.com",
    to,
    subject: "validation de compte",
    html: `
      <p></p>
      <p>Clique ici pour valider ton compte  :</p>
      <a href="${loginLink}" style="color:gray;border:1px solid black;font-weight:bold;">Se connecter</a>
    `,
    headers: {
      "X-Mailin-Track": "0",
      "X-Mailin-Track-click": "0",
      "X-Mailin-Open": "0",
    },
    disableUrlTracking: true,
  });
}
