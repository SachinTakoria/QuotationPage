const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to send email
app.post("/send-email", async (req, res) => {
  try {
    const { name, email, phone, city, quotationDetails } = req.body;

    // Validation
    if (!name || !email || !phone || !city || !quotationDetails) {
      return res.status(400).send("All fields are required, including quotation details");
    }

    // Construct quotation details string
    const quotationDetailsText = `
      Quotation Details:
      - Total Cost: ₹${quotationDetails.totalCost || "N/A"}
      - Selected Website Type: ${quotationDetails.selectedWebsiteType?.label || "Not Selected"}
      - Number of Pages: ${quotationDetails.selectedPageRange?.label || "Not Selected"}
      - Selected Pages: ${quotationDetails.selectedPages?.join(", ") || "None"}
      - Special Requirements: ${
        quotationDetails.specialRequirements?.map(req => req.label).join(", ") || "None"
      }
      - Most Special Requirements: ${
        quotationDetails.mostSpecialRequirements?.map(req => req.label).join(", ") || "None"
      }
      - Selected Technologies: ${quotationDetails.selectedTechnologies?.join(", ") || "None"}
    `;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "OUR_EMAIL", // Your email
        pass: "OUR_PASSKEY", // Your app password
      },
    });

    // Email content for the user
    const userMailOptions = {
      from: "OUR_EMAIL",
      to: email, // User email
      subject: "Your Quotation Details",
      text: `Hello ${name},\n\nHere are your quotation details:\n\n${quotationDetailsText}\n\nThank you.`,
    };

    // Email content for the admin
    const adminMailOptions = {
      from: "OUR_EMAIL",
      to: "admin-email@example.com", // Replace with the admin's email
      subject: "New Quotation Request Received",
      text: `Hello Admin,\n\nA new quotation request has been received:\n\nUser Details:\n- Name: ${name}\n- Email: ${email}\n- Phone: ${phone}\n- City: ${city}\n\n${quotationDetailsText}`,
    };

    // Send email to user and admin
    await transporter.sendMail(userMailOptions); // Send to user
    await transporter.sendMail(adminMailOptions); // Send to admin

    res.status(200).send("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
