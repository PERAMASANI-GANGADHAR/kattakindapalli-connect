require('dotenv').config();
const mongoose = require('mongoose');
const Complaint = require('./models/Complaint'); // మీ model path సరిచూసుకోండి

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');
    const result = await Complaint.deleteMany({});
    console.log(`🗑️ Deleted ${result.deletedCount} complaints`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });