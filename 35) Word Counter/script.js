const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const charNoSpace = document.getElementById('char-no-space');
const sentenceCount = document.getElementById('sentence-count');
const readingTime = document.getElementById('reading-time');

// Average reading speed (words per minute)
const WORDS_PER_MINUTE = 225;

function updateCounts() {
    const text = textInput.value;
    
    // Count words
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    // Count characters
    const chars = text.length;
    
    // Count characters without spaces
    const charsNoSpace = text.replace(/\s/g, '').length;
    
    // Count sentences
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    
    // Calculate reading time
    const minutes = Math.ceil(words / WORDS_PER_MINUTE);
    const readingTimeText = minutes === 1 ? '1 min' : `${minutes} mins`;
    
    // Update UI
    wordCount.textContent = words;
    charCount.textContent = chars;
    charNoSpace.textContent = charsNoSpace;
    sentenceCount.textContent = sentences;
    readingTime.textContent = readingTimeText;
}

// Add event listener for real-time updates
textInput.addEventListener('input', updateCounts);
