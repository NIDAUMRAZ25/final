// Carousel functionality
var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function () {
    showSlider('next');
};

prevBtn.onclick = function () {
    showSlider('prev');
};

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; // trigger reflow
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        carousel.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Start the initial animation
resetTimeAnimation();

// Text-to-Speech functionality
const textToSpeechBtn = document.getElementById('textToSpeechBtn');
const textToSpeechSection = document.getElementById('text-to-speech');
const speakBtn = document.getElementById('speak-btn');
const textInput = document.getElementById('text-input');

// Function to toggle visibility of the Text-to-Speech section
function toggleTextToSpeech() {
    // Hide carousel or other sections
    document.querySelector('.carousel').style.display = 'none'; // Hide the carousel section

    // Show or hide Text-to-Speech section
    if (textToSpeechSection.style.display === 'none') {
        textToSpeechSection.style.display = 'block';
    } else {
        textToSpeechSection.style.display = 'none';
    }
}

// Add event listener to the Text-to-Speech button
textToSpeechBtn.addEventListener('click', toggleTextToSpeech);

// Function to handle speaking the text
function speakText() {
    const text = textInput.value.trim(); // Get the text from the input field

    if (text) {
        const speech = new SpeechSynthesisUtterance(text); // Create a speech object
        speech.lang = 'en-US'; // Set language (adjust if needed)
        speech.rate = 1; // Set speed (default is 1)
        speech.pitch = 1; // Set pitch (default is 1)

        // Speak the text
        window.speechSynthesis.speak(speech);
    } else {
        alert('Please enter some text to speak.');
    }
}

// Add event listener to the Speak Text button
speakBtn.addEventListener('click', speakText);
