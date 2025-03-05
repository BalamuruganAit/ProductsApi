import transporter from "../Utills/mailservice";
import fs from "fs";
import path from "path";
import cron from "node-cron";

export const sendemail = async () => {
  const sender = {
    address: "hello@example.com",
    name: "Mailtrap Test",
  };
  const recipients = ["balamuruganaitech@gmail.com"];

  try {
    const templatePath = path.join(__dirname, "../templates/emailTemplate.html");
    const htmlContent = fs.readFileSync(templatePath, "utf-8");

    const mailOptions: any = {
      from: sender,
      to: recipients,
      subject: "Automated Email",
      text: "This is an automated email sent every minute.",
      html: htmlContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", result);
  } catch (error) {
    console.error("Mail Error:", error);
  }
};

cron.schedule("*/1 * * * *", function () {
  sendemail();
});
