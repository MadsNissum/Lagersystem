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

const mailData = {
    from: 'LagerSystemSkaade@hotmail.com',  // sender address
    to: 'mikkelhess@icloud.com, nissum_10@hotmail.com',   // list of receivers
    subject: 'Hej Mikkel og Mads',
    text: 'That was easy!',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
};

notifyPeople()

export async function notifyPeople() {
    const product = await firestore.getProducts();

    console.log(product);

    product.forEach(product => {
        if(product.expirationDate.getTime() == Date.now() + Date.)
    })
    /*
    transporter.sendMail(mailData, (err, info) => {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    */
}