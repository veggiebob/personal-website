var sendMessage = function(message) {
    fetch('/', {
        method: 'PUT',
        body: message,
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': message.length
        },
        version: 'HTTP/6.9'
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

const form = document.querySelector('form');
console.log(form );
form.onsubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    sendMessage(e.target[0].value);
}