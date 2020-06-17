async function api(metodo, path, data) {
    let params = Object.keys(data).map((name) => {
        return `${name}=${data[name]}`;
    });
    const options = {
        method: metodo,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: params.join('&')
    };

    const res = await fetch(`/api${path}`, options); // htts://tutorencasa.tk
    return res.json();
}

function logger(message) {
    if(typeof message != 'string')
        message = JSON.stringify(message);
    
    const log = document.querySelector('#logger');
    log.innerHTML = `${log.innerHTML}<br/>${message}`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#login').addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('[name="email"]').value;
        const password = form.querySelector('[name="password"]').value;
        api('POST', '/login', { email, password })
            .then((res) => logger(res));
    });
});