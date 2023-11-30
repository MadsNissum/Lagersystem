import assert from 'assert'
import { getEmail, addEmail, getEmails, deleteEmail, updateEmail } from '../database/emailDB.js'


describe('EmailDB Test',()=>{


    describe('Add Email function',()=>{

        it('It should add the email to the database', async ()=>{
    
            let email = 'LagerSystemSkaade@hotmail.com'
    
            let emailDoc = await addEmail({email: email})
    
            let addedEmail = await getEmail(emailDoc.id)
    
            assert.strictEqual(addedEmail.email,email)
    
            deleteEmail(emailDoc.id)
        })
    
    })
    
    describe('Get Email function',()=>{
    
        it('Should return the correct email', async ()=>{
    
            let email = 'LagerSystemSkaade@hotmail.com';
    
            let emailDoc = await addEmail({email: email})
    
            let gettedEmail = await getEmail(emailDoc.id)
    
            assert.strictEqual(gettedEmail.email,email)
    
            deleteEmail(emailDoc.id)
    
        })
    
        it('Should return null if the email doesnt exist', async ()=>{
    
            let email = await getEmail('test')
    
            assert.strictEqual(email,null)
    
        })
    
    })

    describe('Delete Email function', async =>{

        it('Should delete the email', async ()=>{

            let email = 'LagerSystemSkaade@hotmail.com';
    
            let emailDoc = await addEmail({email: email})
    
            deleteEmail(emailDoc.id)
    
            assert.strictEqual(await getEmail(emailDoc.id),null)         

        })       
    })

    //Ved ikke om jeg kan teste den da jeg kommer til at sætte en email
    //ind der ikke hedder lagersystemskaade...
    describe('Update Email function',()=>{

        it('Should update the email',()=>{
            assert.equal('hej','meddig')
        })
        
    })


    
    describe('Get Emails Function',()=>{

        it('Should return an array of correct emails', async ()=>{

            let email = 'LagerSystemSkaade@hotmail.com';

            let email1 = await addEmail({email: email})
            let email2 = await addEmail({email: email})
            let email3 = await addEmail({email: email})

            
            let emailsArray = await getEmails()
            let getEmailsIsWorking = false;

            if(emailsArray.indexOf('email1') && emailsArray.indexOf('email2') && emailsArray.indexOf('email3')) {
                getEmailsIsWorking = true;
            }

            assert.equal(getEmailsIsWorking,true)

            deleteEmail(email1.id)
            deleteEmail(email2.id)
            deleteEmail(email3.id)
        })

    })
})
