const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.'
];
let words = [];
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById("quote");
const buttonElement = document.getElementById("start");
const messageElement = document.getElementById("message");
const typingElement = document.getElementById("typed");
typingElement.value = ""; // reset the typing area on start

buttonElement.addEventListener('click', () => {
    // 1) get random quote
    // 2) set the quote html element to <span>word<span/> for each word
    // 3) highlight the first word
    // 4) reset output_result_message to nothing and set the typed word to nothing
    // 5) focus of typing html which is default keyboard entry field
    // 6) start counting time
    const randomIndex = Math.floor(Math.random()*quotes.length);
    let quote = quotes[randomIndex];
    words = quote.split(' ');
    wordIndex = 0;
    const spans = words.map(function(word) { return `<span>${word} </span>`}); // each word to span to alter color
    quoteElement.innerHTML = spans.join(''); // joins words list into 1 string
    quoteElement.childNodes[0].className = 'highlight'; // set html class to highlight (background color)
    messageElement.innerHTML = ""; // reset end message on start
    typingElement.value = ""; // reset the typing area on start
    typingElement.focus(); // default keyboard input area
    startTime = new Date().getTime();
});

typingElement.addEventListener('input', () => {
    // 1) store typed word and the word in quote
    // 2) check if typed last word in the quote and congratulate / reset
    // 3) if not the last word but typed correctly reset the typing area, go to the next word in the quote
    // 4) if typed wrong set the input field to red background
    let typedWord = typingElement.value; // typed text
    let quotedWord = words[wordIndex]; // the current quote word

    if (typedWord === quotedWord && wordIndex === words.length-1){
        // at the end
        let timePassed = new Date().getTime() - startTime;
        messageElement.innerHTML = `Congratulations. Finished in ${timePassed / 1000} seconds.`;
        typingElement.value = "";
    } else if (typedWord.endsWith(' ') && typedWord.trim() === quotedWord) {
        // wrote the word 
        typingElement.value = "";
        quoteElement.childNodes[wordIndex].className = ""; 
        wordIndex++;
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else {
        // error state
        if (!quotedWord.startsWith(typedWord)) typingElement.className = 'error';
        else typingElement.className = '';
    }
});



