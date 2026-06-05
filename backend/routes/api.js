const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Mock Data
const projects = [
    {
        id: 1,
        title: 'Student Midwife Intern',
        institution: 'Community Maternal Health Center',
        duration: 'January 2026 – April 2026',
        description: 'Gained hands-on experience in maternal care, assisting in prenatal assessments, monitoring labor progression, and providing newborn care under clinical supervision.',
        techStack: ['Maternal Care', 'Newborn Support', 'Clinical Documentation'],
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
        liveLink: '',
        githubLink: ''
    },
    {
        id: 2,
        title: 'Volunteer Health Worker',
        institution: 'Barangay Health Program',
        duration: 'June 2025 – July 2025',
        description: 'Assisted in local community health initiatives, including conducting vital signs monitoring, delivering public health education, and supporting maternal-infant health screening.',
        techStack: ['Vital Signs', 'Health Education', 'Community Health'],
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
        liveLink: '',
        githubLink: ''
    }
];

const skills = [
    {
        category: 'Clinical Skills',
        items: [
            'Maternal Assessment',
            'Newborn Care',
            'Vital Signs Monitoring',
            'Health Education',
            'Infection Prevention and Control',
            'Basic Life Support'
        ]
    }
];

// Routes
router.get('/projects', (req, res) => {
    res.json(projects);
});

router.get('/skills', (req, res) => {
    res.json(skills);
});

router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    try {
        const mailOptions = {
            from: `"${name} (Portfolio)" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER, // Send to your own inbox
            replyTo: email, // Clicking reply replies to the sender directly
            subject: `Portfolio Contact from ${name}`,
            text: `You have a new message from ${name} (${email}):\n\n${message}`,
            html: `
                <h3>New message from your Digital Portfolio</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <hr/>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        if (process.env.GMAIL_USER && process.env.GMAIL_PASS && process.env.GMAIL_PASS !== 'your_16_digit_app_password_here') {
            await transporter.sendMail(mailOptions);
            console.log(`Sent contact email from ${name} <${email}> to Gmail!`);
            res.status(200).json({ success: true, message: 'Message successfully received! I will get back to you soon.' });
        } else {
            console.log(`Received contact from ${name} <${email}>: ${message}\n(Email skipped: GMAIL_USER and GMAIL_PASS are not configured correctly in backend/.env)`);
            res.status(200).json({ success: true, message: 'Message received (Development mode: Email not sent).' });
        }
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

module.exports = router;
