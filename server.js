const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const merchantKey = "your_merchant_key";  // Replace with your actual PayU Merchant Key
const salt = "your_salt_key";  // Replace with your actual PayU Salt Key

app.post("/generateHash", (req, res) => {
    const { txnid, amount, productinfo, firstname, email } = req.body;

    if (!txnid || !amount || !productinfo || !firstname || !email) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    res.json({ hash });
});

app.listen(3000, () => console.log("✅ PayU Hash Generator is running on port 3000"));
