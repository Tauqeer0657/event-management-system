import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// No need to attach QR image now, just send the HTML
async function sendEmail(email, subject, html) {
  const mailOptions = {
    from: "miteshpradhan97@gmail.com",
    to: email,
    subject: subject,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: " + error);
    throw error;
  }
}

function sendEmailWithQrCode(
  email,
  studentName,
  eventName,
  eventDescription,
  venue,
  date,
  qrImageUrl 
) {
  const subject = `Your QR Code for ${eventName}`;
  const formattedDate = new Date(date).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
      <p>Hello <b>${studentName}</b>,</p>
      <p>You have registered for:</p>
      <ul>
        <li><strong>Event:</strong> ${eventName}</li>
        <li><strong>Description:</strong> ${eventDescription}</li>
        <li><strong>Venue:</strong> ${venue}</li>
        <li><strong>Date & Time:</strong> ${formattedDate}</li>
      </ul>

      <p style="text-align: center;">The below QR code is your event pass, Please download it for future.</p>

      <div style="text-align: center;">
        <img src="${qrImageUrl}" alt="QR Code" style="width:200px; height:auto;" />
        <br />
        <a 
          href="${qrImageUrl}" 
          target="_blank"
          download="qr-code-${studentName}.png"
          style="display:inline-block; margin-top:10px; text-decoration:none; background-color:#007bff; color:white; padding:8px 16px; border-radius:4px;"
        >
          View or Download QR Code
        </a>
      </div>
      <hr />
      <p style="font-size: 12px; color: gray;">This pass is valid till the event. Do not share this email.</p>
    </div>
  `;

  return sendEmail(email, subject, html);
}

export { sendEmailWithQrCode };
