# Crop disease knowledge base — used to build the FAISS RAG index
# Each entry: query symptoms → structured diagnosis

CROP_KNOWLEDGE = [
    {
        "symptoms": "white flies small white insects flying leaves yellowing sticky residue honeydew",
        "disease": "Whitefly Infestation",
        "confidence": 0.92,
        "treatment_chemical": "Spray Imidacloprid 17.8% SL or Thiamethoxam 25% WG at recommended dosage. Apply in early morning or evening.",
        "treatment_organic": "Spray neem oil (1500 ppm) solution. Use yellow sticky traps. Introduce natural predators like ladybugs.",
        "climate_impact": "Warm dry weather (25-35°C) with low humidity accelerates whitefly multiplication. Drought stress weakens plants."
    },
    {
        "symptoms": "aphids small green black insects curling leaves sticky honeydew ants",
        "disease": "Aphid Infestation",
        "confidence": 0.93,
        "treatment_chemical": "Apply Imidacloprid or Acetamiprid systemic insecticide. Spray Dimethoate 30% EC at 1.5ml/L.",
        "treatment_organic": "Neem oil spray (2ml/L). Insecticidal soap solution. Encourage ladybugs and lacewings as natural predators.",
        "climate_impact": "Moderate temperatures (15-25°C) and high humidity favor aphid colonies. Dry conditions increase susceptibility."
    },
    {
        "symptoms": "brown spots leaves blight fungal lesions dark edges yellowing dying",
        "disease": "Early Blight (Alternaria)",
        "confidence": 0.88,
        "treatment_chemical": "Apply Mancozeb 75% WP or Chlorothalonil 75% WP at 2g/L. Spray every 7-10 days.",
        "treatment_organic": "Copper-based fungicide spray. Remove infected leaves. Improve air circulation. Avoid overhead irrigation.",
        "climate_impact": "High humidity (>80%) and warm temperatures (24-29°C) promote fungal spread. Wet weather accelerates infection."
    },
    {
        "symptoms": "late blight water soaked lesions dark brown black spots white mold underside",
        "disease": "Late Blight (Phytophthora)",
        "confidence": 0.91,
        "treatment_chemical": "Apply Metalaxyl + Mancozeb (Ridomil Gold) at 2.5g/L. Spray Cymoxanil 8% + Mancozeb 64% WP.",
        "treatment_organic": "Copper hydroxide spray. Remove and destroy infected plants. Avoid waterlogging. Improve drainage.",
        "climate_impact": "Cool wet weather (10-20°C) with high humidity (>90%) is ideal for Phytophthora. Fog and rain spread spores."
    },
    {
        "symptoms": "powdery white coating leaves stems powdery mildew fungus white powder",
        "disease": "Powdery Mildew",
        "confidence": 0.94,
        "treatment_chemical": "Spray Hexaconazole 5% EC or Propiconazole 25% EC at 1ml/L. Apply Sulphur 80% WP.",
        "treatment_organic": "Baking soda solution (1 tsp/L water). Neem oil spray. Milk diluted 1:10 with water. Improve air circulation.",
        "climate_impact": "Warm dry days (20-30°C) with cool nights and moderate humidity (40-70%) favor powdery mildew development."
    },
    {
        "symptoms": "rust orange yellow pustules spots underside leaves rust colored powder",
        "disease": "Leaf Rust",
        "confidence": 0.89,
        "treatment_chemical": "Apply Propiconazole 25% EC or Tebuconazole 25.9% EC at 1ml/L. Spray Mancozeb 75% WP.",
        "treatment_organic": "Remove infected leaves. Sulfur dust application. Neem oil spray. Avoid overhead watering.",
        "climate_impact": "Moderate temperatures (15-22°C) with high humidity and dew promote rust spore germination and spread."
    },
    {
        "symptoms": "yellow leaves chlorosis nutrient deficiency pale green yellowing between veins",
        "disease": "Nutrient Deficiency (Chlorosis)",
        "confidence": 0.82,
        "treatment_chemical": "Apply chelated iron (FeSO4) foliar spray. Use balanced NPK fertilizer. Soil pH correction with lime or sulfur.",
        "treatment_organic": "Compost application. Vermicompost. Foliar spray of diluted seaweed extract. Green manure incorporation.",
        "climate_impact": "Waterlogged soils reduce nutrient uptake. High pH soils lock iron and manganese. Drought reduces absorption."
    },
    {
        "symptoms": "wilting drooping stems root rot damping off seedlings collapsing",
        "disease": "Root Rot / Damping Off",
        "confidence": 0.87,
        "treatment_chemical": "Drench soil with Carbendazim 50% WP or Metalaxyl. Apply Trichoderma viride as biocontrol.",
        "treatment_organic": "Improve drainage. Reduce watering. Apply Trichoderma-enriched compost. Use raised beds.",
        "climate_impact": "Waterlogged conditions and poor drainage create anaerobic soil. High moisture promotes Pythium and Fusarium."
    },
    {
        "symptoms": "spider mites tiny red yellow mites webbing stippling bronze leaves",
        "disease": "Spider Mite Infestation",
        "confidence": 0.90,
        "treatment_chemical": "Spray Abamectin 1.8% EC or Spiromesifen 22.9% SC. Apply Dicofol 18.5% EC at 2ml/L.",
        "treatment_organic": "Neem oil spray. Strong water jet to dislodge mites. Introduce predatory mites (Phytoseiidae). Sulfur dust.",
        "climate_impact": "Hot dry conditions (>30°C) with low humidity accelerate spider mite reproduction. Drought stress worsens infestations."
    },
    {
        "symptoms": "healthy green leaves no disease normal growth vigorous plant",
        "disease": "Healthy Plant",
        "confidence": 0.95,
        "treatment_chemical": "No treatment needed. Continue regular preventive care and monitoring.",
        "treatment_organic": "Maintain good agricultural practices. Regular irrigation, balanced nutrition, and crop rotation.",
        "climate_impact": "Current conditions appear favorable for plant growth. Monitor for any changes in weather patterns."
    },
    {
        "symptoms": "mosaic virus mottled leaves distorted curled mosaic pattern yellow green patches",
        "disease": "Mosaic Virus",
        "confidence": 0.86,
        "treatment_chemical": "No direct cure. Control aphid vectors with Imidacloprid. Remove and destroy infected plants.",
        "treatment_organic": "Remove infected plants immediately. Control insect vectors with neem oil. Use virus-resistant varieties.",
        "climate_impact": "Warm temperatures favor aphid vectors that spread mosaic virus. Drought stress increases plant susceptibility."
    },
    {
        "symptoms": "bacterial blight water soaked lesions angular spots yellowing wilting bacterial infection",
        "disease": "Bacterial Blight",
        "confidence": 0.85,
        "treatment_chemical": "Spray Copper oxychloride 50% WP at 3g/L. Apply Streptomycin sulfate 90% SP at 0.5g/L.",
        "treatment_organic": "Copper-based bactericide. Remove infected plant parts. Avoid overhead irrigation. Crop rotation.",
        "climate_impact": "Warm humid conditions (25-35°C) with rain and wind spread bacterial pathogens. Wounds from storms increase entry."
    },
]
