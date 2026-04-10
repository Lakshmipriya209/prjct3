const translations = {
  en: {
    login: "Login",
    loginBtn: "Login",
    farmer: "Farmer",
    admin: "Admin",
    submit: "Submit",
    next: "Next",
    analyze: "Analyze Irrigation",

    farmDetails: "Farm Details",
    landArea: "Land Area",
    soil: "Soil Type",
    crop: "Crop",
    notify: "Notification Type",
    selectLocation: "Farm Location",

    name: "Name",
    phone: "Phone Number",
    email: "Email",
    feedback: "Enter feedback"
  },

  ta: {
    login: "உள்நுழை",
    loginBtn: "உள்நுழை",
    farmer: "விவசாயி",
    admin: "நிர்வாகி",
    submit: "சமர்ப்பிக்க",
    next: "அடுத்து",
    analyze: "பாசனம் கணக்கிடு",

    farmDetails: "பண்ணை விவரங்கள்",
    landArea: "நில அளவு",
    soil: "மண் வகை",
    crop: "பயிர்",
    notify: "அறிவிப்பு வகை",
    selectLocation: "பண்ணை இடம்",

    name: "பெயர்",
    phone: "தொலைபேசி",
    email: "மின்னஞ்சல்",
    feedback: "கருத்து எழுதவும்"
  },

  hi: {
    login: "लॉगिन",
    loginBtn: "लॉगिन",
    farmer: "किसान",
    admin: "प्रशासक",
    submit: "सबमिट",
    next: "आगे",
    analyze: "सिंचाई विश्लेषण",

    farmDetails: "खेत विवरण",
    landArea: "भूमि क्षेत्र",
    soil: "मिट्टी का प्रकार",
    crop: "फसल",
    notify: "सूचना प्रकार",
    selectLocation: "खेत स्थान",

    name: "नाम",
    phone: "फ़ोन नंबर",
    email: "ईमेल",
    feedback: "फीडबैक लिखें"
  }
};
  
  // Apply language
  function setLanguage(lang) {
    localStorage.setItem("lang", lang);
  
    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      el.innerText = translations[lang][key] || key;
    });
    
    // ✅ FIX placeholders
    document.querySelectorAll("[data-placeholder]").forEach(el => {
      const key = el.getAttribute("data-placeholder");
      el.placeholder = translations[lang][key] || key;
    });
  }
  
  // Load saved language
  window.onload = () => {
  let lang = localStorage.getItem("lang");

  // 🌍 Auto detect browser language if not set
  if (!lang) {
    const browserLang = navigator.language || navigator.userLanguage;

    if (browserLang.startsWith("ta")) lang = "ta";
    else if (browserLang.startsWith("hi")) lang = "hi";
    else lang = "en";

    localStorage.setItem("lang", lang);
  }

  setLanguage(lang);

  // ✅ Set dropdown value automatically
  const dropdown = document.querySelector("select");
  if (dropdown) {
    dropdown.value = lang;
  }
};
  window.setLanguage = setLanguage;