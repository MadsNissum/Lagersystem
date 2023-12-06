import nodemailer from 'nodemailer';
import { getProducts } from '../database/productDB.js';

let messageArray = [];

/**
 * Adds message to daily sent email
 * @param {String} message message that want to be sent
 * @author Mads Nissum
 */
export function addMessageToMail(message) {
    messageArray.push(message)
}

/**
 * Notify people of product in database that expries in 10 days.
 * @param {Array<String>} receivers List of mail adresses to send to
 * @returns response of either info or error
 * @author Mads Nissum
 */
export async function notifyPeople(receivers) {
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

    let mailList = receivers.map(data => data.email);

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
        });

        if (array.length != 0 || messageArray.length != 0) {
            let subject = "";
            let html = "";
            if (array.length != 0 && messageArray.length != 0) {
                subject = "Opdatering på inventar!";
            } else if (array.length != 0) {
                subject = "Inventar er ved at udløbe på dato!";
            } else if (messageArray.length != 0) {
                subject = "Nyt invventar skal bestilles hjem!";
            }

            if (array.length != 0) {
                html += `<h2>Inventar der udløber snart:</h2>`;
                array.forEach(product => {
                    html += `${product.text} udløber her den <b>${product.date}</b><br>`;
                })
                html += `<br>`;
            }

            if (messageArray.length != 0) {
                html += `<h2>Inventar der skal bestilles:</h2>`;
                messageArray.forEach(message => {
                    html += `${message}<br>`;
                })
                messageArray = [];
            }

            const mailData = {
                from: 'LagerSystemSkaade@hotmail.com',  // sender address
                replyTo: 'LagerSystemSkaade@hotmail.com',
                to: mailList.toString(),   // list of receivers
                subject: subject,
                html: html,
            };

            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Mail sent!");
                    resolve({ info: info, message: html });
                }
            });
        } else {
            resolve(null);
        }
    })
}