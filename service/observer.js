import nodemailer from 'nodemailer';
import { getProducts } from '../database/productDB.js';


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

/**
 * Notify people of product in database that expries in 10 days.
 * @param {Array<String>} receivers List of mail adresses to send to
 * @returns response of either info or error
 */
export async function notifyPeople(receivers) {
    return new Promise(async (resolve, reject) => {
        const product = await getProducts();
        let array = [];
    
        product.forEach(product => {
            let date = new Date();
            date.setDate(date.getDate() + 10);

            if (product.getDate() == date.toISOString().split('T')[0]) {
                const brandText = String(product.brand);
                const exDate = String(product.getDate());
                array.push({ text: brandText, date: exDate });
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
                to: receivers,   // list of receivers
                subject: `Inventar er ved at udløbe på dato!`,
                html: html,
            };

            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Mail sent!");
                    resolve(info);
                }
            });
        } else {
            resolve(null);
        }
    })
}