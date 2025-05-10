const translations = {
  en: {
    title: "Welcome",
    description: "This is an English sentence."
  },
  am: {
    title: "እንኳን ደህና መጣህ",
    description: "ይህ የእንግሊዝኛ ሐረግ ነው።"
  }
};

function changeLanguage(lang) {
  localStorage.setItem('lang', lang); // Save preference
  applyLanguage(lang);
}

function applyLanguage(lang) {
  const data = translations[lang];
  for (const key in data) {
    const el = document.getElementById(key);
    if (el) el.innerText = data[key];
  }
}

// Auto-run on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  applyLanguage(savedLang);
});
