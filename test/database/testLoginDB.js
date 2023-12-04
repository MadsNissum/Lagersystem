import { addAccount, deleteAccount, getAccount } from "../../database/loginDB.js"
import { generateSalt } from "../../service/login.js"
import assert from 'assert'

/**
 * Tests to see if a user gets added to the database
 * @author Mikkelhess
 */
describe('LoginDB Test', () => {
    it('Should add the account to the database', async () => {

        let username = 'TestUsername';
        let password = 'flæskesteg';
        let salt = generateSalt();

        await addAccount(username, password, salt);

        let account = await getAccount(username);

        assert.strictEqual(await account.username, username);
        deleteAccount(username);
    });
})


