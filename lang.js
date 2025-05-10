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
  for (const key in translations[lang]) {
    const element = document.getElementById(key);
    if (element) {
      element.innerText = translations[lang][key];
    }
  }
}
