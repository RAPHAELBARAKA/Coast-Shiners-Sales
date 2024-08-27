const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const mpesaSTKPushEndpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const mpesaAccessTokenEndpoint = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
// MPESA credentials
const consumerSecret = 'VNJJPBtTUeWFxW2jbXG0s73refFs2exohXyvQL8zAtPM9xNRyKnEZSeyQGot11am';
const consumerKey = 'OvzT0CDDckDJvrRNc99fGXfz1PGhjwTC1muG6WgDvbN3Xpg1';
const shortcode = '174379';
const passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
exports.initiatepayment = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ error: 'Invalid Kenyan phone number.' });
    }

    // Format phone number with country code (Kenya)
    const formattedPhoneNumber = `254${phoneNumber.substring(phoneNumber.length - 9)}`;

    // Generate timestamp
    const timestamp = moment().format('YYYYMMDDHHmmss');

    // Obtain access token
    const accessToken = await getAccessToken();

    // Prepare STK push request body
    const requestBody = {
      BusinessShortCode: shortcode,
      Password: generatePassword(shortcode, passkey, timestamp),
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhoneNumber,
      PartyB: shortcode,
      PhoneNumber: formattedPhoneNumber,
      CallBackURL: 'https://e4ec-154-159-237-0.ngrok.io/callback', // Replace with your callback URL
      AccountReference: 'Test',
      TransactionDesc: 'Test',
    };

    // Send request to MPESA API to initiate STK push
    const response = await axios.post(mpesaSTKPushEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle response from MPESA API
    console.log('Response:', response.data);

    return res.json({ message: 'STK push request sent successfully' });
  } catch (error) {
    console.error('Error initiating STK push:', error);
    return res.status(500).json({ error: 'Failed to initiate STK push.' });
  }
};

// Function to generate password
function generatePassword(shortcode, passkey, timestamp) {
  const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');
  return password;
}

// Function to obtain access token
async function getAccessToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    const response = await axios.get(mpesaAccessTokenEndpoint, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining access token:', error);
    throw error;
  }
}