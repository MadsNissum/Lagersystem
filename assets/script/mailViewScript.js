/**
 * Changes url to add product
 * @author Lucas Andersen
 */
function addMail() {
    window.location = `mail/add`;
}

/**
 * Changing url til edit email
 * @param {String} id Auto generated id from firebase
 * @author Mads Nissum
 */
function updateMail(id) {
    window.location = `mail/edit/${id}`;
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
    } catch (error) {
        errorCodeAlert(error);
    }
}

