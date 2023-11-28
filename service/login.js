import { addAccount, getAccount } from "../database/loginDB.js";
import sjcl from 'sjcl';
import * as crypto from 'crypto';


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

export async function checkUsername(username) {
    let user = await getAccount(username);
    if (user !== null && username === user.username) {
        return true;
    } else {
        return false;
    }
}

export async function createAccount(username, password) {

    console.log(username);
    console.log(password);

    if (await getAccount(username) != null) {
        return 409; 
    } else {
        const salt = generateSalt();
        addAccount(username, hash(password, salt), salt);
        return 201;
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