import { addAccount, getAccount } from "../../database/loginDB.js"
import { generateSalt } from "../../service/login.js"
import assert from 'assert'

describe('LoginDB Test',()=>{
    it('Should add the account to the database',async ()=>{
    
        let username = 'xXMLGPro420Xx'
        let password = 'flæskesteg'
        let salt = generateSalt()
    
        await addAccount(username,password,salt);
    
        let account = await getAccount(username)
    
        assert.strictEqual(await account.username,username)
        
    })  
})




