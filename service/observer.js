import nodemailer from 'nodemailer';
import firestore from './firestore.js';


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 587,
    host: "smtp.office365.com",
    auth: {
        user: 'LagerSystemSkaade@hotmail.com',
        pass: 'Gruppenersej123',
    },
    secure: false,
});




notifyPeople()

export async function notifyPeople() {
    const product = await firestore.getProducts();

    product.forEach(product => {
        let date = new Date();
        date.setDate(date.getDate() + 10);

        if (product.getDate() == date.toISOString().split('T')[0]) {

            const brandText = String(product.brand);
            const exDate = String(product.getDate())

            const mailData = {
                from: 'LagerSystemSkaade@hotmail.com',  // sender address
                replyTo: 'LagerSystemSkaade@hotmail.com',
                to: 'mikkelhess@icloud.com, nissum_10@hotmail.com',   // list of receivers
                subject: `${brandText} er ved at udløbe på dato!`,
                text: `${brandText} udløber her den ${exDate}`,
                html: `${brandText} udløber her den <b>${exDate}</b>`,
            };

            transporter.sendMail(mailData, (err, info) => {
                if (err)
                    console.log(err)
                else
                    console.log(info);
            });


        }
    })
}