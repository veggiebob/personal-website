function sendMessage (message) {
    console.log('new!');
    fetch('parse', {
        method: 'POST',
        body: message,
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': message.length
        }
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}
