const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// POST - admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET,
      { expiresIn: "8h" } // 8 గంటల తర్వాత టోకెన్ ఆటోమేటిక్‌గా expire అవుతుంది
    );
    return res.json({ token, message: "Login successful" });
  }

  return res.status(401).json({ message: "తప్పు యూజర్‌నేమ్ లేదా పాస్‌వర్డ్" });
});

module.exports = router;