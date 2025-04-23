import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendEmail(email, subject, html) {
  const mailOptions = {
    from: "miteshpradhan97@gmail.com",
    to: email,
    subject: subject,
    html: html,
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


function sendEmailForUserCreation(
    email,
    studentName,
    eventName,
    eventDescription,
    venue,
    date,
    qrImage
  ) {
    const subject = `Your QR Code for ${eventName}`;
    const formattedDate = new Date(date).toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  

    console.log(qrImage, "img");
  
    
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
        <p>Scan the QR code below to access your event pass:</p>
       <img src="${qrImage}" alt="QR Code" style="width:200px; height:auto;" />

        <p>If you can't scan the QR code, open this link: 
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/event-pass" target="_blank">
            Event Pass Link
          </a>
        </p>
        <hr />
        <p style="font-size: 12px; color: gray;">This pass is valid for 1 hour. Do not share this email.</p>
      </div>
    `;
  
    return sendEmail(email, subject, html);
  }

export {sendEmailForUserCreation} ;
