// HTML Selectors

const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const answer = document.querySelector('.answer');

// Window / voice Selectors
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


// Recognition start and end
recognition.onstart = function () {
    console.log('voice is active');
};
recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    content.textContent = transcript;
    readOutLoud(transcript);
};

//add listener to button

btn.addEventListener('click', () => {
    recognition.start();
});

// Reading Results

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();
    //default
    speech.text = `I don't know what you mean by "${message}"`;

    //options
    if (message.includes('how do you spell')) {
        const splitText = message.split("");
        const lettersText = splitText.slice(17);
        console.log(lettersText);
        speech.text = lettersText;
    }
    speech.volume = 1;
    speech.rate = 0.5;
    speech.pitch = 1;
    
    window.speechSynthesis.speak(speech);
    answer.textContent = speech.text;
}