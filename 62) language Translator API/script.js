const inputText = document.getElementById('inputText');
const translatedText = document.getElementById('translatedText');
const translateBtn = document.getElementById('translateBtn');
const fromLang = document.getElementById('fromLang');
const toLang = document.getElementById('toLang');

// Mock dictionary - Simulated translations
const mockTranslations = {
    "en": {
        "es": {
            "hello": "hola",
            "goodbye": "adiós",
            "thank you": "gracias"
        },
        "fr": {
            "hello": "bonjour",
            "goodbye": "au revoir",
            "thank you": "merci"
        },
        "de": {
            "hello": "hallo",
            "goodbye": "auf wiedersehen",
            "thank you": "danke"
        },
        "hi": {
            "hello": "नमस्ते",
            "goodbye": "अलविदा",
            "thank you": "धन्यवाद"
        }
        
    },
    // Add more if needed
};

translateBtn.addEventListener('click', () => {
    const text = inputText.value.trim().toLowerCase();
    const sourceLang = fromLang.value;
    const targetLang = toLang.value;

    let translation = '';

    if (sourceLang === targetLang) {
        translation = text; // Same language
    } else if (mockTranslations[sourceLang] && mockTranslations[sourceLang][targetLang]) {
        translation = mockTranslations[sourceLang][targetLang][text] || "Translation not available.";
    } else {
        translation = "Translation not supported between these languages.";
    }

    translatedText.value = translation;
});