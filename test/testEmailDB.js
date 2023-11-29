import assert from 'assert'
import { getEmail, addEmail, getEmails, deleteEmail, updateEmail } from '../database/emailDB.js'


describe('EmailDB Test',()=>{

    it('It should add the email to the database', async ()=>{

        let email = 'test@test.com'

        let emailDoc = await addEmail({email: email})

        let addedEmail = await getEmail(emailDoc.id)

        assert.strictEqual(email,addedEmail.email)
    })

})