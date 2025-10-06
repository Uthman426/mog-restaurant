const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });


const express = require('express');

const emailjs = require('@emailjs/nodejs');
const cors = require('cors');

const app = express();




app.use(express.json());
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());

// Serve static frontend files (index.html, index.js, css, etc.)
app.use(express.static(path.join(__dirname, "..")));  // ".." goes up to root of project

// Endpoint to send email


app.post('/api/reservation', async (req, res) => {
  const {
    customer_name,
    guest_count,
    reservation_date,
    customer_email,
    phone_number,
    reservation_time,
    message
  } = req.body;

  const templateParams = {
    customer_name,
    guest_count,
    reservation_date,
    customer_email,
    phone_number,
    reservation_time,
    message
  };

  try {
    // Send to restaurant
     await emailjs.send(
      process.env.SERVICE_KEY,
      process.env.TEMPLATE_KEY1,
      templateParams,
      { privateKey: process.env.PRIVATE_KEY ,
        publicKey: process.env.PUBLIC_KEY
      }
    );


    // Send confirmation to customer
    await emailjs.send(
      process.env.SERVICE_KEY,
      process.env.TEMPLATE_KEY2,
      templateParams,
      { privateKey: process.env.PRIVATE_KEY,
        publicKey: process.env.PUBLIC_KEY
       }
    );

    res.status(200).json({ success: true, message: "Reservation sent successfully." });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
