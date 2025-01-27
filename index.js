require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Để phục vụ file frontend

// Secret Key của Google reCAPTCHA
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Xử lý form submit
app.post('/verify-captcha', async (req, res) => {

  console.log('req.body', req.body);
  

    const token = req.body['g-recaptcha-response'];

    console.log('token', token);
    

    if (!token) {
        return res.status(400).json({ success: false, message: 'Captcha token is missing.' });
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: token,
                },
            }
        );

        console.log('response', response.data);
        

        if (response.data.success) {
            return res.status(200).json({ success: true, message: 'Captcha verified successfully!' });
        } else {
            return res.status(400).json({ success: false, message: 'Captcha verification failed.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
