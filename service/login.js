import { addAccount, getAccount } from "../database/loginDB.js";
import sjcl from 'sjcl';
import * as crypto from 'crypto';

/**
 * Middleware used in express to check if user is going to either allowed pages
 * or the user is logged into the system otherwise the user is redirected to '/login'
 * @param {*} request Request from client
 * @param {*} response Response sent to client connected to server
 * @param {*} next Default middleware variable used to go to next step on server
 * @author Mads Nissum & Kasper
 */
export function checkAllowedPages(request, response, next) {
    let allowedPages = [ '/login', '/login/create', '/registerSale' ];
    if (allowedPages.includes(request.url)) {
        next();
    } else {
        if (!request.session.isLoggedIn) {
            response.redirect('/login');
        } else {
            next();
        }
    }
}

/**
 * Used to check if user exists in database and if password matches
 * @param {String} username 
 * @param {String} password 
 * @returns 401 if username dosen't exist in database
 * 
 * 403 if username exists but password is incorrect
 * 
 * 200 if username exists and password is correct
 * @author Mads Nissum & Kasper
 */
export async function checkLogin(username, password) {
    let user = await getAccount(username);

    if (user == null) {
        return 401;
    }

    let passwordTrue = hash(password, user.salt) === user.password;

    if (user !== null && !passwordTrue) {
        return 403;
    } else if (user !== null && passwordTrue) {
        return 200;
    }
}

// TODO Maby delete
export async function checkUsername(username) {
    let user = await getAccount(username);
    if (user !== null && username === user.username) {
        return true;
    } else {
        return false;
    }
}

/**
 * Function used to create account if username dosen't exists in database
 * @param {String} username 
 * @param {String} password 
 * @returns 409 if username exists in database
 * 
 * 201 if account was sucessfully created
 * @author Mads Nissum & Kasper
 */
export async function createAccount(username, password) {
    if (await getAccount(username) != null) {
        return 409; 
    } else {
        const salt = generateSalt();
        await addAccount(username, hash(password, salt), salt);
        return 201;
    }
}

/**
 * Generate salt used for password hashing
 * @returns random generated salt string example: "103259d4fd2b2750edc833ba0f7bc2bf"
 * @author Kasper 
 */
export function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

/**
 * Hashes the password with the salt string
 * @param {String} password 
 * @param {String} salt generated from genereateSalt() function
 * @returns hashed password
 * @author Kasper
 */
function hash(password, salt) {
    const bitArray = sjcl.hash.sha256.hash(password+salt);
    const hash = sjcl.codec.hex.fromBits(bitArray);
    return hash;
}