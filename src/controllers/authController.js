const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByUsername } = require('../models/userModel');

const register = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await createUser(username, hashedPassword, role);
        res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const user = await getUserByUsername(username);
        if (!user) return res.status(400).json({ message: 'ชื่อผู้ใช้ไม่ถูกต้อง' });

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });

        // สร้าง JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // **📌 ตั้งค่า Cookie ให้ปลอดภัย**
        res.cookie('access_token', token, {
            httpOnly: true,       // ป้องกันการเข้าถึงจาก JavaScript (XSS)
            secure: process.env.NODE_ENV === 'production', // ใช้เฉพาะ HTTPS ใน production
            sameSite: 'Strict',   // ป้องกัน CSRF Attack
            maxAge: 24 * 60 * 60 * 1000 // หมดอายุใน 1 ชั่วโมง
        });

        res.json({ message: 'เข้าสู่ระบบสำเร็จ' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
    }
};
const logout = (_, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });
    res.json({ message: 'ออกจากระบบสำเร็จ' });
};

module.exports = { register, login,logout };
