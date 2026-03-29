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
        analyzing: "Analyzing NLP...",
        analyzingVoice: "Analyzing Voice",
        tapToStop: "Tap again to stop & analyze",
        loadingSteps: [
          "Transcribing your voice...",
          "Identifying crop symptoms...",
          "Diagnosing disease...",
          "Preparing treatment plan...",
          "Almost ready..."
        ]
      },
      result: {
        confidence: "Confidence",
        synthetic: "Synthetic Treatment",
        organic: "Organic Alternative",
        climate: "Regional Climate Impact"
      },
      auth: {
        welcome: "Welcome to CropVision",
        subtitle: "Sign in to access your farm intelligence dashboard",
        login: "Login",
        register: "Create Account",
        username: "Username",
        email: "Email Address",
        phone_number: "Phone Number",
        password: "Password",
        confirm_password: "Confirm Password",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        submitLogin: "Sign In",
        submitRegister: "Sign Up"
      },
      store: {
        title: "Agri Marketplace",
        subtitle: "Curated organic solutions, machinery, and seeds precisely matched to your ongoing diagnostic needs.",
        categories: {
          all: "All",
          organic: "Organic",
          chemicals: "Chemicals",
          equipment: "Equipment",
          seeds: "Seeds"
        },
        priceLabel: "Price",
        ratingLabel: "reviews"
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
        analyzing: "विश्लेषण हो रहा है...",
        analyzingVoice: "आवाज का विश्लेषण",
        tapToStop: "रुकने और विश्लेषण के लिए फिर से स्पर्श करें",
        loadingSteps: [
          "आपकी आवाज़ का अनुवाद हो रहा है...",
          "फसल के लक्षणों की पहचान...",
          "बीमारी का निदान...",
          "उपचार योजना तैयार करना...",
          "बस तैयार है..."
        ]
      },
      result: {
        confidence: "विश्वास स्तर",
        synthetic: "रासायनिक उपचार",
        organic: "जैविक विकल्प",
        climate: "क्षेत्रीय जलवायु प्रभाव"
      },
      auth: {
        welcome: "CropVision में आपका स्वागत है",
        subtitle: "अपने फार्म इंटेलिजेंस डैशबोर्ड तक पहुंचने के लिए साइन इन करें",
        login: "लॉगिन",
        register: "खाता बनाएं",
        username: "यूजरनेम",
        email: "ईमेल पता",
        phone_number: "फ़ोन नंबर",
        password: "पासवर्ड",
        confirm_password: "पासवर्ड की पुष्टि करें",
        noAccount: "खाता नहीं है?",
        hasAccount: "पहले से खाता है?",
        submitLogin: "साइन इन करें",
        submitRegister: "साइन अप करें"
      },
      store: {
        title: "कृषि बाज़ार",
        subtitle: "जैविक समाधान, मशीनरी और बीज आपकी नैदानिक आवश्यकताओं के अनुसार।",
        categories: {
          all: "सभी",
          organic: "जैविक",
          chemicals: "रसायन",
          equipment: "उपकरण",
          seeds: "बीज"
        },
        priceLabel: "कीमत",
        ratingLabel: "समीक्षाएं"
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
        browse: "లేదా ఫైల్ ఎంచుకోవడానికి క్లిక్ کنید (PNG, JPG)",
        initiateScan: "స్కాన్ ప్రారంభించండి",
        processing: "ML మోడల్ ప్రాసెస్ అవుతోంది...",
        voiceTitle: "వాయిస్ ఇంటెలిజెన్స్",
        voiceSubtitle: "మీ ప్రాంతీయ భాషలో లక్షణాలు చెప్పండి",
        tapMic: "మైక్ నొక్కండి",
        recording: "रिकॉर्डिंग అవుతోంది...",
        analyzing: "విశ్లేషిస్తోంది...",
        analyzingVoice: "వాయిస్ విశ్లేషిస్తోంది",
        tapToStop: "ఆపి విశ్లేషించడానికి మళ్ళీ నొక్కండి",
        loadingSteps: [
          "మీ వాయిస్‌ని అనువదిస్తోంది...",
          "పంట లక్షణాలను గుర్తిస్తోంది...",
          "వ్యాధిని నిర్ధారిస్తోంది...",
          "చిക്കിత్స ప్రణాళിക്കను సిద్ధం చేస్తోంది...",
          "దాదాపు సిద్ధమైంది..."
        ]
      },
      result: {
        confidence: "విశ్వాసం",
        synthetic: "రసాయన చికిత్స",
        organic: "సేంద్రీయ ప్రత్యామ్నాయం",
        climate: "ప్రాంతీయ వాతావరణ ప్రభావం"
      },
      auth: {
        welcome: "CropVision కి స్వాగతం",
        subtitle: "మీ ఫామ్ ఇంటెలిజెన్స్ డాష్‌బోర్డ్‌ని యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి",
        login: "లాగిన్",
        register: "ఖాతాను సృష్టించండి",
        username: "వినియోగదారు పేరు",
        email: "ఈమెయిల్ చిరునామా",
        phone_number: "ఫోన్ నంబర్",
        password: "పాస్‌వర్డ్",
        confirm_password: "పాస్‌వర్డ్ నిర్ధారించండి",
        noAccount: "ఖాతా లేదా?",
        hasAccount: "ఇప్పటికే ఖాతా ఉందా?",
        submitLogin: "సైన్ ఇన్",
        submitRegister: "సైన్ అప్"
      },
      store: {
        title: "వ్యవసాయ మార్కెట్",
        subtitle: "మీ పంట అవసరాలకు తగిన సేంద్రీయ పరిష్కారాలు, యంత్రాలు మరియు విత్తనాలు.",
        categories: {
          all: "అన్నీ",
          organic: "సేంద్రీయ",
          chemicals: "రసాయనాలు",
          equipment: "పరికరాలు",
          seeds: "విత్తనాలు"
        },
        priceLabel: "ధర",
        ratingLabel: "సమీక్షలు"
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
        analyzing: "பகுப்பாய்வு செய்கிறது...",
        analyzingVoice: "குரலை பகுப்பாய்வு செய்கிறது",
        tapToStop: "நிறுத்த மற்றும் பகுப்பாய்வு செய்ய மீண்டும் தட்டவும்",
        loadingSteps: [
          "உங்கள் குரலை மாற்றுகிறது...",
          "பயிர் அறிகுறிகளை கண்டறிகிறது...",
          "நோயை கண்டறிகிறது...",
          "சிகிச்சை திட்டத்தை தயாரிக்கிறது...",
          "கிட்டத்தட்ட தயார்..."
        ]
      },
      result: {
        confidence: "நம்பிக்கை",
        synthetic: "செயற்கை சிகிச்சை",
        organic: "இயற்கை மாற்று",
        climate: "பிராந்திய காலநிலை தாக்கம்"
      },
      auth: {
        welcome: "CropVision-க்கு வரவேற்கிறோம்",
        subtitle: "உங்கள் பண்ணை நுண்ணறிவு டாஷ்போர்டை அணுக உள்நுழையவும்",
        login: "உள்நுழை",
        register: "கணக்கை உருவாக்கு",
        username: "பயனர் பெயர்",
        email: "மின்னஞ்சல் முகவரி",
        phone_number: "தொலைபேசி எண்",
        password: "கடவுச்சൊல்",
        confirm_password: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        noAccount: "கணக்கு இல்லையா?",
        hasAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
        submitLogin: "உள்நுழைக",
        submitRegister: "பதிவு செய்க"
      },
      store: {
        title: "வேளாண் சந்தை",
        subtitle: "உங்கள் பயிர் நோயறிதல் தேவைகளுக்கு ஏற்ப இயற்கையான தீர்வுகள் மற்றும் விதைகள்.",
        categories: {
          all: "அனைத்தும்",
          organic: "இயற்கை",
          chemicals: "வேதிப்பொருட்கள்",
          equipment: "உபகரணங்கள்",
          seeds: "விதைகள்"
        },
        priceLabel: "விலை",
        ratingLabel: "மதிப்புரைகள்"
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
        analyzing: "विश्लेषण होत आहे...",
        analyzingVoice: "आवाजाचे विश्लेषण",
        tapToStop: "थांबण्यासाठी आणि विश्लेषण करण्यासाठी पुन्हा दाबा",
        loadingSteps: [
          "तुमचा आवाज ट्रान्सक्राइब करत आहे...",
          "पीक लक्षणे ओळखत आहे...",
          "रोगाचे निदान करत आहे...",
          "उपचार योजना तयार करत आहे...",
          "जवळजवळ तयार..."
        ]
      },
      result: {
        confidence: "विश्वास पातळी",
        synthetic: "रासायनिक उपचार",
        organic: "सेंद्रिय पर्याय",
        climate: "प्रादेशिक हवामान प्रभाव"
      },
      auth: {
        welcome: "CropVision मध्ये आपले स्वागत आहे",
        subtitle: "तुमच्या फार्म इंटेलिजन्स डॅशबोर्डवर प्रवेश करण्यासाठी साइन इन करा",
        login: "लॉगिन",
        register: "खाते तयार करा",
        username: "वापरकर्तानाव",
        email: "ईमेल पत्ता",
        phone_number: "फोन नंबर",
        password: "पासवर्ड",
        confirm_password: "पासवर्डची पुष्टी करा",
        noAccount: "खाते नाही?",
        hasAccount: "आधीच खाते आहे?",
        submitLogin: "साइन इन करा",
        submitRegister: "साइन अप करा"
      },
      store: {
        title: "कृषी बाजार",
        subtitle: "तुमच्या पिकांच्या गरजेनुसार दर्जेदार सेंद्रिय उपाय आणि बी-बियाणे.",
        categories: {
          all: "सर्व",
          organic: "सेंद्रिय",
          chemicals: "रसायने",
          equipment: "उपकरणे",
          seeds: "बियाणे"
        },
        priceLabel: "किंमत",
        ratingLabel: "समीक्षा"
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
        analyzing: "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        analyzingVoice: "ಧ್ವನಿ ವಿಶ್ಲೇಷಣೆ",
        tapToStop: "ನಿಲ್ಲಿಸಲು ಮತ್ತು ವಿಶ್ಲೇಷಿಸಲು ಮತ್ತೆ ಟ್ಯಾಪ್ ಮಾಡಿ",
        loadingSteps: [
          "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಪ್ರತಿಲೇಖಿಸಲಾಗುತ್ತಿದೆ...",
          "ಬೆಳೆ ಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಲಾಗುತ್ತಿದೆ...",
          "ರೋಗವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
          "ಚಿಕिತ್ಸಾ ಯೋಜನೆಯನ್ನು ತಯಾರಿಸಲಾಗುತ್ತಿದೆ...",
          "ಬಹುತೇಕ ಸಿದ್ಧವಾಗಿದೆ..."
        ]
      },
      result: {
        confidence: "ವಿಶ್ವಾಸ",
        synthetic: "ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ",
        organic: "ಸಾವಯವ ಪರ್ಯಾಯ",
        climate: "ಪ್ರಾದೇಶಿಕ ಹವಾಮಾನ ಪ್ರಭಾವ"
      },
      auth: {
        welcome: "CropVision ಗೆ ಸ್ವಾಗತ",
        subtitle: "ನಿಮ್ಮ ಫಾರ್ಮ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
        login: "ಲಾಗಿನ್",
        register: "ಖಾತೆ ತೆರೆಯಿರಿ",
        username: "ಬಳಕೆದಾರರ ಹೆಸರು",
        email: "ಇಮೇಲ್ ವಿಳಾಸ",
        phone_number: "ಫೋನ್ ಸಂಖ್ಯೆ",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        confirm_password: "ಪಾಸ್‌ವರ್ಡ್ ಪ್ರಮಾಣೀಕರಿಸಿ",
        noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
        hasAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
        submitLogin: "ಸೈನ್ ಇನ್",
        submitRegister: "ಸೈನ್ ಅಪ್"
      },
      store: {
        title: "ಕೃಷಿ ಮಾರುಕಟ್ಟೆ",
        subtitle: "ನಿಮ್ಮ ಬೆಳೆ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸಾವಯವ ಪರಿಹಾರಗಳು, ಯಂತ್ರೋಪಕರಣಗಳು ಮತ್ತು ಬೀಜಗಳು.",
        categories: {
          all: "ಎಲ್ಲಾ",
          organic: "ಸಾವಯವ",
          chemicals: "ರಾಸಾಯನಿಕಗಳು",
          equipment: "ಉಪಕರಣಗಳು",
          seeds: "ಬೀಜಗಳು"
        },
        priceLabel: "ಬೆಲೆ",
        ratingLabel: "ವಿಮರ್ಶೆಗಳು"
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
        analyzing: "വിശകലനം ചെയ്യുന്നു...",
        analyzingVoice: "ശബ്‌ദ വിശകലനം",
        tapToStop: "നിർത്തുന്നതിനും വിശകലനം ചെയ്യുന്നതിനും വീണ്ടും ടാപ്പ് ചെയ്യുക",
        loadingSteps: [
          "നിങ്ങളുടെ ശബ്ദം മാറ്റുന്നു...",
          "വിള ലക്ഷണങ്ങൾ തിരിച്ചറിയുന്നു...",
          "രോഗം നിർണ്ണയിക്കുന്നു...",
          "ചികിത്സാ പദ്ധതി തയ്യാറാക്കുന്നു...",
          "ഏതാണ്ട് തയ്യാറായി..."
        ]
      },
      result: {
        confidence: "ആത്മവിശ്വാസം",
        synthetic: "രാസ ചികിത്സ",
        organic: "ജൈവ ബദൽ",
        climate: "പ്രാദേശിക കാലാവസ്ഥ സ്വാധീനം"
      },
      auth: {
        welcome: "CropVision-ലേക്ക് സ്വാഗതം",
        subtitle: "നിങ്ങളുടെ ഫാം ഇന്റലിജൻസ് ഡാഷ്ബോർഡ് ആക്സസ് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക",
        login: "ലോഗിൻ",
        register: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
        username: "ഉപയോക്തൃനാമം",
        email: "ഇമെയിൽ വിലാസം",
        phone_number: "ഫോൺ നമ്പർ",
        password: "പാസ്‌വേഡ്",
        confirm_password: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
        noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
        hasAccount: "നിലവിൽ അക്കൗണ്ട് ഉണ്ടോ?",
        submitLogin: "സൈൻ ഇൻ",
        submitRegister: "സൈйн അപ്പ്"
      },
      store: {
        title: "കാർഷിക വിപണി",
        subtitle: "നിങ്ങളുടെ വിളകൾക്ക് അനുയോജ്യമായ ജൈവ വളങ്ങൾ, യന്ത്രങ്ങൾ, വിത്തുകൾ.",
        categories: {
          all: "എല്ലാം",
          organic: "ജൈവം",
          chemicals: "രാസവസ്തുക്കൾ",
          equipment: "ഉപകരണങ്ങൾ",
          seeds: "വിത്തുകൾ"
        },
        priceLabel: "വില",
        ratingLabel: "അഭിപ്രായങ്ങൾ"
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
