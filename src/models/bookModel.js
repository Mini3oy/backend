const pool = require('../config/database');

const createBook = async (title, authorID, description) => {
    const query = `INSERT INTO books (title, author_id, description) VALUES ($1, $2, $3) RETURNING *`;
    const values = [title, authorID, description];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getBooks = async () => {
    const query = `SELECT books.*, users.username AS author FROM books JOIN users ON books.author_id = users.id`;
    const result = await pool.query(query);
    return result.rows;
};

const getBookById = async (id) => {
    const query = `SELECT * FROM books WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const updateBook = async (id, title, description) => {
    const query = `UPDATE books SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`;
    const values = [title, description, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};
const deleteBook = async (id) => {
    const query = `
        UPDATE books
        SET is_deleted = TRUE, 
            deleted_at = CURRENT_TIMESTAMP   -- บันทึกเวลาเมื่อถูกลบ
        WHERE id = $1 AND is_deleted = FALSE
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
        return { message: 'ไม่พบข้อมูลที่ต้องการลบ หรือข้อมูลถูกลบไปแล้ว' };
    }

    return result.rows[0];  // ส่งกลับข้อมูลที่ถูกลบ
};


const recoverBook = async (id) => {
    const query = `
        UPDATE books
        SET is_deleted = FALSE, 
            deleted_at = NULL, 
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND is_deleted = TRUE
        RETURNING *;
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
        return { message: 'ไม่พบข้อมูลที่ถูกลบ หรือข้อมูลไม่ได้ถูกลบ' };
    }

    return result.rows[0];  // ส่งกลับข้อมูลที่กู้คืน
};


module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook ,recoverBook };