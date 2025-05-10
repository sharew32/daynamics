const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual Google API key

// Function to translate the content of the page
function translateContent(targetLang) {
  // Get all text nodes (could be extended to more complex selection criteria)
  const elements = document.querySelectorAll('.translatable');
  elements.forEach((el) => {
    const originalText = el.innerText;
    fetchTranslation(originalText, targetLang, el);
  });
}

// Fetch translation from Google Translate API
function fetchTranslation(text, targetLang, element) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      q: text,
      target: targetLang,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    element.innerText = data.data.translations[0].translatedText;
  })
  .catch((error) => {
    console.error('Error translating text:', error);
  });
}

// Change language and save preference
function changeLanguage(lang) {
  localStorage.setItem('lang', lang); // Save preference
  translateContent(lang); // Translate content
}

// Auto-apply saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('lang') || 'en'; // Default to English
  translateContent(savedLang);
});
