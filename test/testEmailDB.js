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
    
})
