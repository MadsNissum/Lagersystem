const form = document.getElementById('form');
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
        } catch (error) {
            errorCodeAlert(error)
        }
    }
}

