const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual Google API key

// Function to translate all text nodes within the body
function translateBodyContent(targetLang) {
  const bodyTextNodes = document.body.querySelectorAll('*');
  
  bodyTextNodes.forEach((element) => {
    if (element.children.length === 0 && element.innerText.trim()) { // Only translate text nodes (not empty or container elements)
      const originalText = element.innerText;
      if (originalText.trim()) {
        translateText(originalText, targetLang, element);
      }
    }
  });
}

// Function to get translation from Google Translate API
function translateText(text, targetLang, element) {
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
    element.innerText = data.data.translations[0].translatedText; // Update text in HTML element
  })
  .catch((error) => {
    console.error('Error translating text:', error);
  });
}

// Change language and save preference
function changeLanguage(lang) {
  localStorage.setItem('lang', lang); // Save the user's language preference
  translateBodyContent(lang); // Translate all body content
}

// Auto-apply saved language on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('lang') || 'en'; // Default to English
  translateBodyContent(savedLang); // Translate content to the saved language on page load
});
