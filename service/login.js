import { getAccount } from "../database/loginDB.js";

export function checkAllowedPages(request, response, next) {
    let allowedPages = [ '/login', '/postLogin', '/createaccount', '/postCreateAccount' ];
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
    if (user !== null && username === user.username && password === user.password) {
        return true;
    }
    console.log("Wrong username or password");
    return false;
}

export async function createAccount(username, password) {
    if (await getAccount(username) != null) {
        console.log("Username already in use");
    } else {
        addAccount(username, password);
    }
}