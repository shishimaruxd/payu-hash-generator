const express = require('express');
const crypto = require('crypto');  // Required for hash generation
const cors = require('cors'); // Allow frontend requests
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Use Railway's port

app.use(express.json());
app.use(cors());

// Route to generate hash for PayU payment gateway
app.post('/generate-hash', (req, res) => {
    const { key, txnid, amount, productinfo, firstname, email, salt } = req.body;
    
    if (!key || !txnid || !amount || !productinfo || !firstname || !email || !salt) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // String to be hashed (as per PayU documentation)
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    
    // Generate SHA-512 hash
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    res.json({ hash });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
