import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  "en-IN": {
    translation: {
      nav: {
        diagnostics: "Diagnostics",
        history: "History & Calendar",
        store: "Marketplace",
        advisory: "Advisory",
        expertCall: "Expert Call"
      },
      hub: {
        title: "KrishiNetra AI",
        subtitle: "Upload an image of your crop condition or use Voice Intelligence to describe symptoms in your native language.",
        dragDrop: "Drag & drop your imagery",
        browse: "or click to browse local files (PNG, JPG)",
        initiateScan: "Initiate Scan",
        processing: "Processing ML Model...",
        voiceTitle: "Voice Intelligence",
        voiceSubtitle: "Speak symptoms naturally in your regional dialect",
        tapMic: "Tap Mic to Start",
        recording: "Recording...",
        analyzing: "Analyzing NLP..."
      },
      result: {
        confidence: "Confidence",
        synthetic: "Synthetic Treatment",
        organic: "Organic Alternative",
        climate: "Regional Climate Impact"
      }
    }
  },
  "hi-IN": {
    translation: {
      nav: {
        diagnostics: "निदान",
        history: "इतिहास और पंचांग",
        store: "बाज़ार",
        advisory: "सलाह",
        expertCall: "विशेषज्ञ को कॉल करें"
      },
      hub: {
        title: "फसल निदान केंद्र",
        subtitle: "अपनी फसल की तस्वीर अपलोड करें या अपनी भाषा में लक्षण बताएं।",
        dragDrop: "अपनी तस्वीर यहाँ खींचें",
        browse: "या फ़ाइल चुनने के लिए क्लिक करें (PNG, JPG)",
        initiateScan: "स्कैन शुरू करें",
        processing: "ML मॉडल प्रोसेस हो रहा है...",
        voiceTitle: "वॉयस इंटेलिजेंस",
        voiceSubtitle: "अपनी क्षेत्रीय भाषा में लक्षण बताएं",
        tapMic: "माइक दबाएं",
        recording: "रिकॉर्डिंग हो रही है...",
        analyzing: "विश्लेषण हो रहा है..."
      },
      result: {
        confidence: "विश्वास स्तर",
        synthetic: "रासायनिक उपचार",
        organic: "जैविक विकल्प",
        climate: "क्षेत्रीय जलवायु प्रभाव"
      }
    }
  },
  "te-IN": {
    translation: {
      nav: {
        diagnostics: "రోగనిర్ధారణ",
        history: "చరిత్ర & క్యాలెండర్",
        store: "మార్కెట్‌ప్లేస్",
        advisory: "సలహా",
        expertCall: "నిపుణుడిని పిలవండి"
      },
      hub: {
        title: "పంట రోగనిర్ధారణ కేంద్రం",
        subtitle: "మీ పంట చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా మీ భాషలో లక్షణాలు చెప్పండి.",
        dragDrop: "మీ చిత్రాన్ని ఇక్కడ లాగండి",
        browse: "లేదా ఫైల్ ఎంచుకోవడానికి క్లిక్ చేయండి (PNG, JPG)",
        initiateScan: "స్కాన్ ప్రారంభించండి",
        processing: "ML మోడల్ ప్రాసెస్ అవుతోంది...",
        voiceTitle: "వాయిస్ ఇంటెలిజెన్స్",
        voiceSubtitle: "మీ ప్రాంతీయ భాషలో లక్షణాలు చెప్పండి",
        tapMic: "మైక్ నొక్కండి",
        recording: "రికార్డింగ్ అవుతోంది...",
        analyzing: "విశ్లేషిస్తోంది..."
      },
      result: {
        confidence: "విశ్వాసం",
        synthetic: "రసాయన చికిత్స",
        organic: "సేంద్రీయ ప్రత్యామ్నాయం",
        climate: "ప్రాంతీయ వాతావరణ ప్రభావం"
      }
    }
  },
  "ta-IN": {
    translation: {
      nav: {
        diagnostics: "நோய் கண்டறிதல்",
        history: "வரலாறு & நாட்காட்டி",
        store: "சந்தை",
        advisory: "ஆலோசனை",
        expertCall: "நிபுணரை அழைக்கவும்"
      },
      hub: {
        title: "பயிர் நோய் கண்டறிதல் மையம்",
        subtitle: "உங்கள் பயிரின் படத்தை பதிவேற்றவும் அல்லது உங்கள் மொழியில் அறிகுறிகளை விவரிக்கவும்.",
        dragDrop: "உங்கள் படத்தை இங்கே இழுக்கவும்",
        browse: "அல்லது கோப்பை தேர்ந்தெடுக்க கிளிக் செய்யவும் (PNG, JPG)",
        initiateScan: "ஸ்கேன் தொடங்கவும்",
        processing: "ML மாதிரி செயலாக்கப்படுகிறது...",
        voiceTitle: "குரல் நுண்ணறிவு",
        voiceSubtitle: "உங்கள் பிராந்திய மொழியில் அறிகுறிகளை சொல்லுங்கள்",
        tapMic: "மைக்கை தட்டவும்",
        recording: "பதிவு செய்கிறது...",
        analyzing: "பகுப்பாய்வு செய்கிறது..."
      },
      result: {
        confidence: "நம்பிக்கை",
        synthetic: "செயற்கை சிகிச்சை",
        organic: "இயற்கை மாற்று",
        climate: "பிராந்திய காலநிலை தாக்கம்"
      }
    }
  },
  "mr-IN": {
    translation: {
      nav: {
        diagnostics: "निदान",
        history: "इतिहास आणि दिनदर्शिका",
        store: "बाजारपेठ",
        advisory: "सल्ला",
        expertCall: "तज्ञांना कॉल करा"
      },
      hub: {
        title: "पीक निदान केंद्र",
        subtitle: "आपल्या पिकाचा फोटो अपलोड करा किंवा आपल्या भाषेत लक्षणे सांगा.",
        dragDrop: "आपला फोटो येथे ड्रॅग करा",
        browse: "किंवा फाइल निवडण्यासाठी क्लिक करा (PNG, JPG)",
        initiateScan: "स्कॅन सुरू करा",
        processing: "ML मॉडेल प्रक्रिया होत आहे...",
        voiceTitle: "व्हॉइस इंटेलिजन्स",
        voiceSubtitle: "आपल्या प्रादेशिक भाषेत लक्षणे सांगा",
        tapMic: "मायक्रोफोन दाबा",
        recording: "रेकॉर्डिंग होत आहे...",
        analyzing: "विश्लेषण होत आहे..."
      },
      result: {
        confidence: "विश्वास पातळी",
        synthetic: "रासायनिक उपचार",
        organic: "सेंद्रिय पर्याय",
        climate: "प्रादेशिक हवामान प्रभाव"
      }
    }
  },
  "kn-IN": {
    translation: {
      nav: {
        diagnostics: "ರೋಗನಿರ್ಣಯ",
        history: "ಇತಿಹಾಸ & ಕ್ಯಾಲೆಂಡರ್",
        store: "ಮಾರುಕಟ್ಟೆ",
        advisory: "ಸಲಹೆ",
        expertCall: "ತಜ್ಞರನ್ನು ಕರೆಯಿರಿ"
      },
      hub: {
        title: "ಬೆಳೆ ರೋಗನಿರ್ಣಯ ಕೇಂದ್ರ",
        subtitle: "ನಿಮ್ಮ ಬೆಳೆಯ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ.",
        dragDrop: "ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ",
        browse: "ಅಥವಾ ಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ (PNG, JPG)",
        initiateScan: "ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ",
        processing: "ML ಮಾದರಿ ಪ್ರಕ್ರಿಯೆಯಾಗುತ್ತಿದೆ...",
        voiceTitle: "ವಾಯ್ಸ್ ಇಂಟೆಲಿಜೆನ್ಸ್",
        voiceSubtitle: "ನಿಮ್ಮ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯಲ್ಲಿ ಲಕ್ಷಣಗಳನ್ನು ಹೇಳಿ",
        tapMic: "ಮೈಕ್ ಒತ್ತಿರಿ",
        recording: "ರೆಕಾರ್ಡಿಂಗ್ ಆಗುತ್ತಿದೆ...",
        analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ..."
      },
      result: {
        confidence: "ವಿಶ್ವಾಸ",
        synthetic: "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ",
        organic: "ಸಾವಯವ ಪರ್ಯಾಯ",
        climate: "ಪ್ರಾದೇಶಿಕ ಹವಾಮಾನ ಪ್ರಭಾವ"
      }
    }
  },
  "ml-IN": {
    translation: {
      nav: {
        diagnostics: "രോഗനിർണ്ണയം",
        history: "ചരിത്രം & കലണ്ടർ",
        store: "മാർക്കറ്റ്പ്ലേസ്",
        advisory: "ഉപദേശം",
        expertCall: "വിദഗ്ധനെ വിളിക്കുക"
      },
      hub: {
        title: "വിള രോഗനിർണ്ണയ കേന്ദ്രം",
        subtitle: "നിങ്ങളുടെ വിളയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ നിങ്ങളുടെ ഭാഷയിൽ ലക്ഷണങ്ങൾ വിവരിക്കുക.",
        dragDrop: "നിങ്ങളുടെ ചിത്രം ഇവിടെ വലിച്ചിടുക",
        browse: "അല്ലെങ്കിൽ ഫയൽ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക (PNG, JPG)",
        initiateScan: "സ്കാൻ ആരംഭിക്കുക",
        processing: "ML മോഡൽ പ്രോസസ്സ് ചെയ്യുന്നു...",
        voiceTitle: "വോയ്സ് ഇന്റലിജൻസ്",
        voiceSubtitle: "നിങ്ങളുടെ പ്രാദേശിക ഭാഷയിൽ ലക്ഷണങ്ങൾ പറയുക",
        tapMic: "മൈക്ക് അമർത്തുക",
        recording: "റെക്കോർഡ് ചെയ്യുന്നു...",
        analyzing: "വിശകലനം ചെയ്യുന്നു..."
      },
      result: {
        confidence: "ആത്മവിശ്വാസം",
        synthetic: "രാസ ചികിത്സ",
        organic: "ജൈവ ബദൽ",
        climate: "പ്രാദേശിക കാലാവസ്ഥ സ്വാധീനം"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en-IN",
    fallbackLng: "en-IN",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
