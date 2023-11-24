const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);

const username = document.getElementById('username');
const password = document.getElementById('password');

async function handleSubmit(event) {
    event.preventDefault();

    if (username.value.trim() == "") {
        alert('Username is blank or invalid!');
    } else if (password.value.trim() == "") {
        alert('Password is blank or invalid!');
    } else {
        try {
            await request('/login/create', { username: username.value, password: password.value }, 'POST');
            window.location = "/inventory";
        } catch (error) {
            errorCodeAlert(error);
        }
    }
}