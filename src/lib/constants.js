export const SITE_URL = "https://globalbiomedicals.net";
export const SITE_NAME = "Global Biomedical Inc";
export const SITE_PHONE = "+91 9257984336";
export const SITE_PHONES = ["+91 9257984336", "+91 8529833535", "+91 9983301657"];
export const SITE_EMAIL = "info@globalbiomedicals.net";

export const CATEGORY_DESCRIPTIONS = {
  "hematology-analyzer": {
    name: "Hematology Analyzer",
    tagline: "Automated 3-Part & 5-Part Cell Counters for Clinical Laboratories",
    description: "High-precision automated hematology analyzers, CBC machines, and cell counters designed for hospital laboratories, pathology centers, and diagnostic facilities across India. Featuring fast throughput, accurate differential parameters, low sample volume, and comprehensive AMC/CMC service support.",
    uses: "Used for automated Complete Blood Count (CBC), white blood cell 3-part & 5-part differential analysis, hemoglobin measurement, platelet counting, and anemia evaluation.",
    targetAudience: "Pathology Laboratories, Diagnostic Centers, Hospitals, ICUs, and Research Institutes.",
    specifications: [
      "Throughput: 30 to 60 tests/hour",
      "Parameters: 21 to 28 parameters with histograms & scattergrams",
      "Sample Volume: Whole blood 10-20µL, Pre-diluted 20µL",
      "Display: High-resolution touch screen LCD",
      "Data Storage: Up to 100,000 patient results with histograms"
    ],
    buyingGuide: "When selecting a hematology analyzer, consider test workload per day (3-part vs 5-part differential), maintenance cost per test, availability of OEM reagents, and local technical service response times."
  },
  "biochemistry-analyzer": {
    name: "Biochemistry Analyzer",
    tagline: "Semi-Automated & Fully Automated Clinical Chemistry Systems",
    description: "Advanced clinical biochemistry analyzers for photometric and turbidimetric testing in pathology laboratories and hospital diagnostic departments. Excellent linearity, low reagent consumption, built-in incubator, and pre-programmed assay protocols.",
    uses: "Used for liver function tests (LFT), kidney function tests (KFT), lipid profiles, blood glucose, cardiac markers, and specialized enzyme assays.",
    targetAudience: "Clinical Laboratories, Hospital Diagnostic Centers, Health Check-up Clinics, and Diagnostic Networks.",
    specifications: [
      "Wavelengths: 340nm to 670nm optical filters",
      "Light Source: Long-life halogen-tungsten lamp / LED optical system",
      "Reaction Temp: 25°C, 30°C, 37°C controlled incubation",
      "Memory: 200+ test protocols and 10,000 sample records",
      "Quality Control: Levey-Jennings QC charts & Westgard rules"
    ],
    buyingGuide: "Choose semi-automated systems for small to medium workload laboratories, or fully automated analyzers for high-throughput hospital laboratories requiring continuous batch testing."
  },
  "electrolyte-analyzer": {
    name: "Electrolyte Analyzer",
    tagline: "Ion-Selective Electrode (ISE) Analyzers for Na+, K+, Cl-, Ca++, pH",
    description: "Fast, high-accuracy Ion Selective Electrode (ISE) electrolyte analyzers engineered for clinical diagnostics, emergency rooms, ICUs, and central laboratories. Instant electrolyte profiling with minimum sample volume.",
    uses: "Quantitative measurement of Sodium (Na+), Potassium (K+), Chloride (Cl-), Ionized Calcium (iCa++), Lithium (Li+), and pH in serum, plasma, whole blood, or urine.",
    targetAudience: "Critical Care Units (ICU/CCU), Emergency Rooms, Dialysis Centers, Pathology Labs, and Hospital Wards.",
    specifications: [
      "Measuring Speed: ≤ 30 seconds per test sample",
      "Sample Volume: 65µL - 150µL whole blood or serum",
      "Electrodes: Maintenance-free ISE electrodes with long operational lifespan",
      "Calibration: Automated 1-point and 2-point auto-calibration",
      "Display & Printer: Built-in thermal printer and LCD interface"
    ],
    buyingGuide: "Verify electrode replacement costs, reagent pack stability, automatic calibration features, and availability of emergency technical support when purchasing electrolyte units."
  },
  "urine-analyzer": {
    name: "Urine Analyzer",
    tagline: "Automated Urinalysis Test Strip Readers & Sediment Systems",
    description: "Compact and automated urine analyzer systems providing high-throughput urinalysis for clinical laboratories and routine health checkups. Accurate test strip reflection photometry.",
    uses: "Detection of glucose, bilirubin, ketone, specific gravity, blood, pH, protein, urobilinogen, nitrite, and leukocytes in urine.",
    targetAudience: "Pathology Centers, Routine Diagnostics, Hospital Outpatient Labs, and Polyclinics.",
    specifications: [
      "Throughput: 60 to 120 strips/hour",
      "Test Strips: 10, 11, or 14 parameter urinalysis strips",
      "Light Source: Cold LED illumination system",
      "Data Export: RS232 / USB barcode scanner & LIS connection"
    ],
    buyingGuide: "Ensure strip compatibility, optical reader resolution, LIS integration options, and simple cleaning protocols."
  },
  "immunoassay-analyzer": {
    name: "Immunoassay Analyzer",
    tagline: "Chemiluminescence (CLIA) & ELISA Readers for Hormone & Tumor Markers",
    description: "Ultra-sensitive Chemiluminescence Immunoassay (CLIA) and ELISA microplate reader systems for quantitative determination of thyroid profiles, cardiac markers, tumor markers, infectious diseases, and fertility hormones.",
    uses: "Quantitative measurement of T3, T4, TSH, Vitamin D, Vitamin B12, PSA, CEA, Troponin I, Ferritin, and infectious disease antibodies.",
    targetAudience: "Reference Laboratories, Endocrinology Clinics, Multi-specialty Hospitals, and IVF Centers.",
    specifications: [
      "Technology: Direct Chemiluminescence / Microplate ELISA Photometry",
      "Sensitivity: High analytical sensitivity down to pg/mL range",
      "Reagent Storage: Onboard refrigerated reagent carousel",
      "Throughput: 80 - 180 tests/hour with continuous loading"
    ],
    buyingGuide: "Evaluate assay menu breadth, reagent shelf-life, calibration frequency, onboard refrigeration, and emergency maintenance coverage."
  }
};

export const BRAND_DESCRIPTIONS = {
  "mindray": {
    name: "Mindray Medical Technologies",
    description: "Mindray is a global leader in medical equipment and diagnostic solution manufacturing. Renowned for high-durability CBC hematology analyzers, chemistry analyzers, patient monitors, and ultrasound machines.",
    advantages: [
      "High reliability and durable hardware engineering",
      "Comprehensive 3-part and 5-part hematology range",
      "Wide availability of genuine reagents and spare parts in India",
      "Low maintenance costs and user-friendly touch interface"
    ]
  },
  "erba": {
    name: "Erba Diagnostics / Transasia",
    description: "Erba Transasia Bio-Medicals is one of India's most trusted diagnostic brands, supplying clinical biochemistry analyzers, electrolyte analyzers, urinalysis strips, and diagnostic reagents across hospitals and pathology networks.",
    advantages: [
      "Extensive nationwide service engineer coverage",
      "Cost-effective reagent cost per test",
      "Proven accuracy in routine clinical chemistry testing",
      "Robust calibration stability and long electrode life"
    ]
  },
  "roche": {
    name: "Roche Diagnostics",
    description: "Roche Diagnostics is a world leader in in-vitro diagnostics and tissue-based cancer diagnostics. Known globally for Cobas series biochemistry analyzers, Roche 9180 electrolyte analyzers, and high-precision immunoassay systems.",
    advantages: [
      "Gold-standard optical accuracy and reference precision",
      "Automated quality control and traceability",
      "Global standard reagent formulations",
      "Ideal for reference laboratories and tertiary hospitals"
    ]
  },
  "abbott": {
    name: "Abbott Diagnostics",
    description: "Abbott Diagnostics provides cutting-edge hematology, immunoassay, point-of-care, and blood screening equipment engineered for high throughput and clinical diagnostics.",
    advantages: [
      "Advanced multi-angle laser scatter technology",
      "Exceptional linearity and low detection limits",
      "Seamless LIS network connectivity",
      "High operational uptime"
    ]
  }
};
