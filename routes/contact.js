const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'araghuwanshi1007@gmail.com',
    pass: '???'
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Email content to send to admin
    const adminMailOptions = {
      from: 'araghuwanshi1007@gmail.com',
      to: 'aaraghu2000@gmail.com',
      subject: 'New Contact Form Submission - Dharv Buildcon',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>This email was sent from the Dharv Buildcon website contact form.</em></p>
      `
    };

    // Send email to admin
    await transporter.sendMail(adminMailOptions);

    if (email) {
      // Send confirmation email to user
      const userMailOptions = {
        from: 'araghuwanshi1007@gmail.com',
        to: email,
        subject: 'Thank You - Dharv Buildcon',
        html: `
          <h2>Thank You for Contacting Us!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to Dharv Buildcon. We have received your inquiry and will get back to you within 24 hours.</p>
          <p>Best regards,<br/>
          <strong>Dharv Buildcon Team</strong></p>
        `
      };

      // Send confirmation email to user
      try {
        await transporter.sendMail(userMailOptions);
      } catch (userEmailError) {
        console.log('User confirmation email failed, but admin email sent:', userEmailError);
      }
    }

    console.log('Contact form submission:', { name, email, phone, message });
    res.json({ success: true, message: "Thank you! We will contact you soon." });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: "Error sending email. Please try again." });
  }
});

module.exports = router;