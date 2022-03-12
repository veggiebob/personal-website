const parseButton = document.querySelector('#parse-button');
const parseInput = document.querySelector('#parse-input');
const parseOutput = document.querySelector('#parse-output');
const parseOutputMode = document.querySelector('#output-mode');
const parseMode = document.querySelector('#parse-mode');
parseButton.onclick = () => {
    let message = parseInput.value;
    fetch('/parse', {
        method: 'POST',
        body: message,
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': message.length,
            'Parse-Mode': parseMode.value,
            'Output-Mode': parseOutputMode.value
        }
    }).then(res => {
        res.text().then(text => {
            parseOutput.innerHTML = text.replace(/\n/g, '<br>');
        });
    }).catch(err => {
        console.log(err);
    })
}
parseMode.addEventListener('change', () => {
    parseButton.click();
});
parseOutputMode.addEventListener('change', () => {
    parseButton.click();
});
parseInput.addEventListener('keyup', () => parseButton.click());