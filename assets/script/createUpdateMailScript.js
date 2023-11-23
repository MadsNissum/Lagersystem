const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);

const email = document.getElementById('email');
const inputName = document.getElementById('name');

/**
 * This function handles the form request on create and update product.
 * @param {SubmitEvent} event
 * @author Mads Nissum
 */
async function handleSubmit(event) {
    event.preventDefault();

    if (email.value.trim() == "") {
        alert("Email is empty!");
    } else if (inputName.value.trim() == "") {
        alert("Name is empty!");
    } else {
        let id = null;
        let method;
        if (form.action.split('/')[4] == "edit") {
            id = window.location.href.split('/')[5];
            method = "PUT";
        } else {
            method = "POST";
        }
        const body = {
            email: {
                email: email.value,
                name: inputName.value
            },
            id : id
        };

        try {
            await request(form.action, body, method);
            window.location = "/mail";
        } catch {
            alert("Something went wrong on the server!");
        }
    }
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
    console.log(respons.status);
    if (respons.status !== 201) {
        console.log("TEST");
        throw new Error(respons.status);
    }
}