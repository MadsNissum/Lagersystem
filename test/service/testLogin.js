// i am tha test monkeyyyyyyyyyyyyyyyyyyyyy :-)

import { getAccount } from "../../database/loginDB.js"
import { createAccount } from "../../service/login.js"
import assert from 'assert'

describe('Login Test',()=>{

    it('Create account function', async ()=>{

        await createAccount('testAccount','kaninpis')

        let account = await getAccount('testAccount')
        
        let accountExists = false;

        if(account.username === 'testAccount') {
            accountExists = true;
        }

        assert.strictEqual(accountExists,true)

    })

  


})