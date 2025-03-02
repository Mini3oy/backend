const express = require('express');
const { authenticateUser, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
  recoverBookController
} = require('../controllers/bookController');

const router = express.Router();

// 📌 CRUD Books API
router.post('/', authenticateUser, createBookController);  // 📌 Create
router.get('/', getAllBooksController);                    // 📌 Read All
router.get('/:id', getBookByIdController);                 // 📌 Read One
router.put('/:id', authenticateUser, updateBookController); // 📌 Update
router.put('/deleted/:id', authenticateUser, authorizeRole(['adminสูงสุด', 'admin']), deleteBookController); // 📌 Delete
router.put('/recover/:id', authenticateUser, authorizeRole(['adminสูงสุด', 'admin']), recoverBookController); // 📌 Delete

module.exports = router;
