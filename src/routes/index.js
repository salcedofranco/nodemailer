const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');
require('dotenv').config()

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>User Information</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
        </ul>
        <p>${message}</p>

        
    `;

     transporter = nodemailer.createTransport({
        host: 'ca9.toservers.com',
        port: process.env.MI_PORT,
        secure: true,
        auth: {
            user: 'contact@francosalcedodev.com.ar',
            pass: process.env.MI_CONTRA,
            
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"DESDE PORTFOLIO" <contact@francosalcedodev.com.ar>', // sender address,
        to: 'fcedo13@gmail.com',
        subject: 'Website Contact Form',
        // text: 'Hello World'
        html: contentHTML
    })

    transporter.sendMail(info, function(err, res){
        if(err){
            console.log('error')
        }else{
            console.log('Message enviado: %s', info.messageId);
        }
    });

    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com

    

    res.redirect('/success.html');
});

module.exports = router;