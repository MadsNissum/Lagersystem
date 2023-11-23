/**
 * Changes url to add product
 * @author Lucas Andersen
 */
function addMail() {
    window.location = `/addMail`;
}

/**
 * Changing url til edit email
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
function updateMail(id) {
    window.location = `/editMail/${id}`;
}

/**
 * Calling delete request for product with id
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
async function deleteMail(id) {
    try {
        await deleteRequest(window.location.href + "/" + id);
        window.location = '/mail';
    } catch {
        alert("Something went wrong on the server!");
    }
}

/**
 * HTTP delete request from url
 * @param {String} url String url
 * @returns request response
 * @author Mads Nissum
 */
async function deleteRequest(url) {
    console.log(url);
    let respons = await fetch(url, { method: "DELETE" });
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
}