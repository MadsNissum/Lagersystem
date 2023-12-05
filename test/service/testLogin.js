
import { getAccount } from "../../database/loginDB.js"
import { checkLogin, createAccount } from "../../service/login.js"
import { deleteAccount } from "../../database/loginDB.js"
import assert from 'assert'

/**
 * Tests to see if a user can be created
 * And if a user can login succesfully
 * @author Mikkelhess
 */
describe('Login Test', () => {

    it('Create account function', async () => {

        await createAccount('testAccount', 'password123');

        let account = await getAccount('testAccount');

        let accountExists = false;

        if (account.username === 'testAccount') {
            accountExists = true;
        }

        assert.strictEqual(accountExists, true);

        deleteAccount('testAccount');
    })

    it('Check Login function', async () => {
        let username = 'testingAccount';
        let password = 'qwerty';

        await createAccount(username, password);

        let status = await checkLogin(username, password);

        assert.strictEqual(status, 200);

        deleteAccount('testingAccount');

    })
})