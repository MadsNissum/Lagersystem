
/**
 * Function make a post request with url and body for request
 * @param {String} url URL Sting to post a request.
 * @param {Object} objekt Object sent as the body of post request.
 * @author Mads Nissum
 */
async function getRequest(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) {
        console.log("TEST");
        throw new Error(respons.status);
    }
    return await respons.json();
}


/**
 * Function make a post request with url and body for request
 * @param {String} url URL Sting to post a request.
 * @param {Object} objekt Object sent as the body of post request.
 * @author Mads Nissum
 */
async function request(url, objekt, method) {
    const respons = await fetch(url, {
        method: method,
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    });
    if (respons.status !== 201 && respons.status !== 200) {
        throw new Error(respons.status);
    }
    return respons.status;
}

/**
 * HTTP delete request from url
 * @param {String} url String url
 * @returns request response
 * @author Mads Nissum
 */
async function deleteRequest(url) {
    let respons = await fetch(url, { method: "DELETE" });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return respons.status;
}

/**
 * Makes an alert basen on the error code
 * @param {Error} error An error that is trown in the code.
 * @author Mads Nissum
 */
function errorCodeAlert(error) {
    let errorCode = Number(error.message.toString());
    switch (errorCode) {
        case 401:
            alert("Username and password wrong!")
            break;
        case 403:
            alert("Password wrong!")
            break;
        case 409:
            alert("Username already in use!");
            break;
        default:
            alert("Something went wrong on the server!");
            break;
    }
}
