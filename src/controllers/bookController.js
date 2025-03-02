const { createBook, getBooks, getBookById, updateBook, deleteBook,recoverBook } = require('../models/bookModel');

const createBookController = async (req, res) => {
  const { title, description } = req.body;
  const authorId = req.user.id; // ใช้ ID ของผู้ที่ Login เป็นผู้เขียน

  if (!title || !description) {
    return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
  }

  try {
    const book = await createBook(title, authorId, description);
    res.status(201).json({ message: 'สร้างหนังสือสำเร็จ', book });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

const getAllBooksController = async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

const getBookByIdController = async (req, res) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'ไม่พบหนังสือ' });
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

const updateBookController = async (req, res) => {
  const { title, description } = req.body;
  const bookId = req.params.id;

  try {
    const book = await updateBook(bookId, title, description);
    if (!book) return res.status(404).json({ message: 'ไม่พบหนังสือ' });
    res.status(200).json({ message: 'อัปเดตสำเร็จ', book });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

const deleteBookController = async (req, res) => {
  try {
    const book = await deleteBook(req.params.id);
    if (!book) return res.status(404).json({ message: 'ไม่พบหนังสือ' });
    res.status(200).json({ message: 'ลบหนังสือสำเร็จ' });
  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};
const recoverBookController = async (req, res) => {
    try {
      const book = await recoverBook(req.params.id);
      if (!book) return res.status(404).json({ message: 'ไม่พบหนังสือ' });
      res.status(200).json({ message: 'กู้หนังสือคืนสำเร็จ' });
    } catch (error) {
      res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
    }
  };

module.exports = {
  createBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
  recoverBookController
};
