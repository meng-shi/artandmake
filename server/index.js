require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const db = new Database(path.join(__dirname, 'artandmake.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS interests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    program TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const checkPrograms = db.prepare('SELECT COUNT(*) as count FROM programs').get();
if (checkPrograms.count === 0) {
  const insertProgram = db.prepare('INSERT INTO programs (name, description, icon, color) VALUES (?, ?, ?, ?)');
  insertProgram.run('Fine Art', 'Traditional art classes focusing on drawing, painting, and mixed media for all ages', 'palette', '#e94560');
  insertProgram.run('Art and Tech', 'Digital art, animation, and 3D design classes combining creativity with technology', 'computer', '#0f3460');
  insertProgram.run('One-time Workshop', 'Themed art workshops — perfect for trying something new or a fun weekend activity', 'tools', '#f8b500');
  insertProgram.run('Portfolio', 'Advanced portfolio development for students preparing for art school or college applications', 'brush', '#16213e');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'artandmakestudio@gmail.com',
    pass: process.env.GMAIL_PASS || ''
  }
});

app.get('/api/programs', (req, res) => {
  const programs = db.prepare('SELECT * FROM programs').all();
  res.json(programs);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)').run(name, email, phone, message);

  try {
    await transporter.sendMail({
      from: `"Art&Make Website" <artandmakestudio@gmail.com>`,
      to: 'artandmakestudio@gmail.com',
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    console.log(`Contact email sent from ${name} (${email})`);
  } catch (err) {
    console.error('Email send failed:', err.message);
  }

  res.json({ id: result.lastInsertRowid, message: 'Message sent successfully' });
});

app.post('/api/interest', async (req, res) => {
  const { name, email, phone, program, message } = req.body;

  if (!name || !email || !program) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = db.prepare('INSERT INTO interests (name, email, phone, program, message) VALUES (?, ?, ?, ?, ?)').run(name, email, phone, program, message);

  try {
    await transporter.sendMail({
      from: `"Art&Make Website" <artandmakestudio@gmail.com>`,
      to: 'artandmakestudio@gmail.com',
      replyTo: email,
      subject: `Interest in ${program} — ${name}`,
      html: `
        <h3>New Program Interest</h3>
        <p><strong>Program:</strong> ${program}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'No additional message'}</p>
      `
    });
    console.log(`Interest email sent for ${program} from ${name} (${email})`);
  } catch (err) {
    console.error('Email send failed:', err.message);
  }

  res.json({ id: result.lastInsertRowid, message: 'Interest registered successfully' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Art&Make server running on http://localhost:${PORT}`);
});
