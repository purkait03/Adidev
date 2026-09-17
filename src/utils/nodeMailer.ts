import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

if (!smtpUser || !smtpPass) {
  throw new Error("SMTP_USER and SMTP_PASS are required");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export const SendMail = async (email: string, code: string) => {
  try {
    const info = await transporter.sendMail({
      from: smtpUser,
      to: email,
      subject: "Your Verification Code",
      text: `Your verification code is ${code}`,
      html: `
        <div style="
          margin: 0;
          padding: 40px 20px;
          background-color: #f4f6f8;
          font-family: Arial, Helvetica, sans-serif;
        ">
          <div style="
            max-width: 500px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 35px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          ">
    
            <h1 style="
              margin: 0 0 15px;
              color: #222222;
              font-size: 28px;
            ">
              Email Verification
            </h1>
    
            <p style="
              margin: 0 0 25px;
              color: #666666;
              font-size: 16px;
              line-height: 1.6;
            ">
              Hello,
              <br />
              Please use the verification code below to verify your email address.
            </p>
    
            <div style="
              display: inline-block;
              padding: 15px 30px;
              background-color: #f1f5ff;
              border: 1px solid #d6e0ff;
              border-radius: 8px;
              margin: 10px 0 25px;
            ">
              <span style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                color: #2563eb;
              ">
                ${code}
              </span>
            </div>
    
            <hr style="
              margin: 30px 0 20px;
              border: none;
              border-top: 1px solid #eeeeee;
            " />
    
          </div>
        </div>
        `,
    });

    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
