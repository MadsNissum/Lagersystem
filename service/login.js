import { addAccount, getAccount } from "../database/loginDB.js";
import sjcl from 'sjcl';
import * as crypto from 'crypto';


export function checkAllowedPages(request, response, next) {
    let allowedPages = [ '/login', '/login/create' ];
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

export async function checkLogin(username, password) {
    let user = await getAccount(username);
    if (user !== null && hash(password, user.salt) === user.password) {
        return true;
    }
    console.log("Wrong username or password");
    return false;
}

export async function createAccount(username, password) {
    if (await getAccount(username) != null) {
        console.log("Username already in use");
    } else {
        const salt = generateSalt();
        addAccount(username, hash(password, salt), salt);
    }
}

function generateSalt() {
    const salt = crypto.randomBytes(16).toString('hex');
    return salt;
}

function hash(password, salt) {
    const bitArray = sjcl.hash.sha256.hash(password+salt);
    const hash = sjcl.codec.hex.fromBits(bitArray);
    return hash;
}