const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const multer = require("multer");
const verifyAdmin = require("../middleware/authMiddleware");

// photo upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// Photo + Selfie రెండు ఫైల్స్ ఒకేసారి తీసుకోవడానికి
const uploadFields = upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "selfie", maxCount: 1 },
]);

// POST - submit a new complaint (with monthly rate limiting + mandatory selfie)
router.post("/", uploadFields, async (req, res) => {
  try {
    const { category, description, location, wardNumber, reporterName, reporterPhone } = req.body;

    console.log("Files received:", req.files); // డీబగ్ లాగ్

    // సెల్ఫీ తప్పనిసరి చెక్
    if (!req.files || !req.files.selfie) {
      return res.status(400).json({
        message: "సెల్ఫీ తప్పనిసరి. మా గ్రామ ప్రజల ఫిర్యాదులు మాత్రమే పరిగణించబడతాయి.",
      });
    }

    // Rate limit చెక్: గత 30 రోజుల్లో ఈ నంబర్ నుండి ఎన్ని ఫిర్యాదులు వచ్చాయో చూడటం
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentCount = await Complaint.countDocuments({
      reporterPhone,
      createdAt: { $gte: oneMonthAgo },
    });

    if (recentCount >= 3) {
      return res.status(429).json({
        message: "మీరు ఈ నెలలో గరిష్ట పరిమితి (3 ఫిర్యాదులు) దాటారు. దయచేసి వచ్చే నెలలో మళ్ళీ ప్రయత్నించండి.",
      });
    }

    const complaint = new Complaint({
      category,
      description,
      location,
      wardNumber,
      reporterName,
      reporterPhone,
      photoUrl: req.files.photo ? `/uploads/${req.files.photo[0].filename}` : null,
      selfieUrl: `/uploads/${req.files.selfie[0].filename}`,
    });
    await complaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - all complaints (for admin / dashboard) - PROTECTED
router.get("/", verifyAdmin, async (req, res) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.json(complaints);
});

// GET - public stats (total/pending/in-progress/resolved counts only) - NOT PROTECTED
router.get("/stats/summary", async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    res.json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// GET - search complaints by phone number (public, for tracking)
router.get("/search/phone/:phone", async (req, res) => {
  try {
    const complaints = await Complaint.find({ reporterPhone: req.params.phone }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - track complaint by ID
router.get("/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: "Invalid complaint ID" });
  }
});

// PATCH - update status + resolution note + photo (admin use) - PROTECTED
router.patch("/:id", verifyAdmin, upload.single("resolutionPhoto"), async (req, res) => {
  try {
    const updateData = { status: req.body.status };

    if (req.body.resolutionNote) {
      updateData.resolutionNote = req.body.resolutionNote;
    }
    if (req.file) {
      updateData.resolutionPhotoUrl = `/uploads/${req.file.filename}`;
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;