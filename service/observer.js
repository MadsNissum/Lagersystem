import nodemailer from 'nodemailer';
import firestore from './firestore.js';


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
        user: 'LagerSystemSkaade@hotmail.com',
        pass: 'Gruppenersej123'
    },
    secure: false,
});


notifyPeople()

export async function notifyPeople() {
    const product = await firestore.getProducts();
    let array = [];

    product.forEach(product => {
        let date = new Date();
        date.setDate(date.getDate() + 10);

        if (product.getDate() == date.toISOString().split('T')[0]) {
            const brandText = String(product.brand);
            const exDate = String(product.getDate());
            array.push({text: brandText, date: exDate});
        }
    })

    if (array.length != 0) {
        let html = "";

        array.forEach(product => {
            html += `${product.text} udløber her den <b>${product.date}</b><br>`;
        })

        const mailData = {
            from: 'LagerSystemSkaade@hotmail.com',  // sender address
            replyTo: 'LagerSystemSkaade@hotmail.com',
            to: 'mikkelhess@icloud.com, nissum_10@hotmail.com',   // list of receivers
            subject: `Inventar er ved at udløbe på dato!`,
            html: html,
        };
    
        transporter.sendMail(mailData, (err, info) => {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }
}