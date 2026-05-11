const express = require('express');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const db = new Database(path.join(__dirname, 'brushbuild.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS programs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    color TEXT
  );

  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    program_id INTEGER,
    age_range TEXT,
    level TEXT,
    duration TEXT,
    schedule TEXT,
    price REAL,
    description TEXT,
    image TEXT,
    location TEXT,
    FOREIGN KEY (program_id) REFERENCES programs(id)
  );

  CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT,
    specialization TEXT,
    bio TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id INTEGER,
    student_name TEXT NOT NULL,
    student_age INTEGER,
    parent_name TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    parent_phone TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (class_id) REFERENCES classes(id)
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const checkPrograms = db.prepare('SELECT COUNT(*) as count FROM programs').get();
if (checkPrograms.count === 0) {
  const insertProgram = db.prepare('INSERT INTO programs (name, description, icon, color) VALUES (?, ?, ?, ?)');
  insertProgram.run('Fine Art - Kids', 'Creative art classes for children ages 4-12, focusing on fundamentals and self-expression', 'palette', '#e94560');
  insertProgram.run('Fine Art - Teen', 'Advanced art programs for teenagers ages 11-18, building professional techniques', 'brush', '#f8b500');
  insertProgram.run('Digital Art', 'Modern digital art and design classes for all ages', 'computer', '#0f3460');
  insertProgram.run('Maker Lab', 'Hands-on maker and craft workshops for creative builders', 'tools', '#16213e');
}

const checkClasses = db.prepare('SELECT COUNT(*) as count FROM classes').get();
if (checkClasses.count === 0) {
  const insertClass = db.prepare('INSERT INTO classes (name, program_id, age_range, level, duration, schedule, price, description, image, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertClass.run('Creative Drawing', 1, '4-6', 'Beginner', '1.5h/week', 'Sat 9:00 AM', 149, 'Introduction to drawing basics with fun, engaging projects', 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', 'Main Studio');
  insertClass.run('Painting Explorers', 1, '6-9', 'Beginner', '1.5h/week', 'Sat 11:00 AM', 169, 'Watercolor and acrylic painting for young artists', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400', 'Main Studio');
  insertClass.run('Art & Crafts', 1, '7-12', 'All Levels', '2h/week', 'Sun 10:00 AM', 179, 'Mixed media projects including paper, fabric, and found objects', 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400', 'Main Studio');
  insertClass.run('Advanced Sketching', 2, '11-14', 'Intermediate', '2h/week', 'Wed 4:00 PM', 189, 'Developing observational skills and technical drawing', 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400', 'Main Studio');
  insertClass.run('Oil Painting Master', 2, '14-18', 'Advanced', '2.5h/week', 'Sat 2:00 PM', 219, 'Traditional oil painting techniques and composition', 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400', 'Main Studio');
  insertClass.run('Portfolio Development', 2, '15-18', 'Advanced', '3h/week', 'Sun 1:00 PM', 249, 'College prep portfolio building for art school admissions', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', 'Main Studio');
  insertClass.run('Digital Illustration', 3, '8-12', 'Beginner', '1.5h/week', 'Tue 4:00 PM', 159, 'Introduction to digital art using tablets and software', 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=400', 'Digital Lab');
  insertClass.run('Animation Basics', 3, '10-16', 'Intermediate', '2h/week', 'Thu 5:00 PM', 179, 'Create your own animated stories and characters', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400', 'Digital Lab');
  insertClass.run('3D Design & Print', 3, '12-18', 'All Levels', '2h/week', 'Fri 4:00 PM', 199, '3D modeling and printing for beginners and advanced', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400', 'Maker Lab');
  insertClass.run('Woodworking Basics', 4, '8-14', 'Beginner', '2h/week', 'Sat 9:00 AM', 189, 'Safety, tools, and basic woodworking projects', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400', 'Maker Lab');
  insertClass.run('Sewing & Textile Art', 4, '10-18', 'All Levels', '2h/week', 'Sun 11:00 AM', 169, 'Hand and machine sewing, fabric art, and sustainable fashion', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'Maker Lab');
  insertClass.run('Robotics & Circuit', 4, '10-16', 'Intermediate', '2h/week', 'Wed 5:00 PM', 199, 'Build electronic projects and simple robots', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400', 'Maker Lab');
}

const checkTeachers = db.prepare('SELECT COUNT(*) as count FROM teachers').get();
if (checkTeachers.count === 0) {
  const insertTeacher = db.prepare('INSERT INTO teachers (name, title, specialization, bio, image) VALUES (?, ?, ?, ?, ?)');
  insertTeacher.run('Sarah Chen', 'Lead Art Instructor', 'Fine Art, Watercolor', 'Sarah has 12 years of teaching experience and a MFA from RISD. She specializes in helping young artists find their unique voice.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200');
  insertTeacher.run('Marcus Williams', 'Digital Arts Director', 'Digital Illustration, Animation', 'Former game designer turned educator, Marcus brings industry experience to help students create portfolio-worthy work.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200');
  insertTeacher.run('Emily Rodriguez', 'Maker Lab Coordinator', 'Woodworking, 3D Printing', 'Emily combines engineering background with creative passion to inspire the next generation of makers.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200');
  insertTeacher.run('David Park', 'Senior Art Instructor', 'Oil Painting, Drawing', 'David studied at Art Students League of NYC and has guided hundreds of students through their artistic journeys.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200');
  insertTeacher.run('Lisa Thompson', 'Teen Program Lead', 'Portfolio Development, Mixed Media', 'Lisa specializes in preparing high school students for art college admissions with strong portfolios.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200');
  insertTeacher.run('James Wilson', 'Technology Instructor', 'Robotics, Circuit Design', 'With a background in electrical engineering, James makes complex technology accessible and fun.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200');
}

app.get('/api/programs', (req, res) => {
  const programs = db.prepare('SELECT * FROM programs').all();
  res.json(programs);
});

app.get('/api/classes', (req, res) => {
  const { program, level, age } = req.query;
  let query = 'SELECT c.*, p.name as program_name, p.color as program_color FROM classes c LEFT JOIN programs p ON c.program_id = p.id WHERE 1=1';
  const params = [];

  if (program) {
    query += ' AND c.program_id = ?';
    params.push(program);
  }
  if (level) {
    query += ' AND c.level = ?';
    params.push(level);
  }
  if (age) {
    query += ' AND c.age_range LIKE ?';
    params.push(`%${age}%`);
  }

  const classes = db.prepare(query).all(...params);
  res.json(classes);
});

app.get('/api/classes/:id', (req, res) => {
  const classItem = db.prepare('SELECT c.*, p.name as program_name, p.color as program_color FROM classes c LEFT JOIN programs p ON c.program_id = p.id WHERE c.id = ?').get(req.params.id);
  if (classItem) {
    res.json(classItem);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

app.get('/api/teachers', (req, res) => {
  const teachers = db.prepare('SELECT * FROM teachers').all();
  res.json(teachers);
});

app.post('/api/register', (req, res) => {
  const { classId, studentName, studentAge, parentName, parentEmail, parentPhone } = req.body;

  if (!studentName || !parentName || !parentEmail) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = db.prepare('INSERT INTO registrations (class_id, student_name, student_age, parent_name, parent_email, parent_phone) VALUES (?, ?, ?, ?, ?, ?)').run(classId, studentName, studentAge, parentName, parentEmail, parentPhone);

  res.json({ id: result.lastInsertRowid, message: 'Registration submitted successfully' });
});

app.get('/api/register/:id', (req, res) => {
  const registration = db.prepare('SELECT * FROM registrations WHERE id = ?').get(req.params.id);
  if (registration) {
    res.json(registration);
  } else {
    res.status(404).json({ error: 'Registration not found' });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const result = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)').run(name, email, phone, message);

  res.json({ id: result.lastInsertRowid, message: 'Message sent successfully' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`BrushBuild server running on http://localhost:${PORT}`);
});