const express = require('express');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// เข้าถึงได้ทุกคนที่ Login แล้ว
router.get('/profile', authenticateUser, (req, res) => {
  res.json({ message: 'ข้อมูลผู้ใช้', user: req.user });
});

// เฉพาะ Admin สูงสุด
router.get('/admin', authenticateUser, authorizeRole(['adminสูงสุด']), (req, res) => {
  res.json({ message: 'ยินดีต้อนรับ Admin สูงสุด' });
});

module.exports = router;
