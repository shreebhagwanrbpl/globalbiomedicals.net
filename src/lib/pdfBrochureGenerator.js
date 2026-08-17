import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// Helper to convert any image URL (local or remote) to Base64 Data URL to guarantee html2canvas renders it cleanly
async function getBase64Image(url) {
  if (!url) return "/global-logo.png";
  if (url.startsWith("data:")) return url;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || img.width || 400;
        canvas.height = img.naturalHeight || img.height || 400;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.95));
      } catch (e) {
        console.warn("Canvas export failed for image:", e);
        resolve("/global-logo.png");
      }
    };

    img.onerror = () => {
      // If CORS or loading fails, attempt fetch blob
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve("/global-logo.png");
          reader.readAsDataURL(blob);
        })
        .catch(() => resolve("/global-logo.png"));
    };

    img.src = url;
  });
}

export async function generateProductPDF(product) {
  if (!product) return;

  const rawTitle = product.title || "Biomedical Product";
  const brand = product.brand || "Global Biomedical";
  const model = product.model || "Standard";
  const instrument = product.instrument || "Diagnostic Analyzer";
  const usage = product.usage || "Clinical Laboratory & Hospital";
  const automation = product.automation || "Fully Automatic";
  const capacity = product.capacity || product.throughput || "Standard High Capacity";
  const desc = product.desc || product.description || "High performance diagnostic analyzer designed for accuracy, reliability, and speed in medical laboratories, hospitals, and clinical settings across India.";
  
  const rawProductImg = product.image || (product.images && product.images[0]) || "/global-logo.png";

  // Pre-load and convert image to Base64 to ensure 100% rendering in html2canvas
  const [productImgBase64, logoBase64] = await Promise.all([
    getBase64Image(rawProductImg),
    getBase64Image("/global-logo.png")
  ]);

  // Clean title formatting (prevent duplicate brand or model prefixes if already present in product.title)
  let cleanTitle = rawTitle;
  const lowerTitle = cleanTitle.toLowerCase();
  const lowerBrand = brand.toLowerCase();
  
  if (!lowerTitle.includes(lowerBrand) && brand !== "N/A" && brand !== "Global Biomedical") {
    cleanTitle = `${brand} ${cleanTitle}`;
  }

  // Create temporary container off-screen
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-9999px";
  container.style.left = "-9999px";
  container.style.width = "794px"; // A4 width at 96 DPI
  container.style.minHeight = "1123px"; // A4 height at 96 DPI
  container.style.backgroundColor = "#ffffff";
  container.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
  container.style.color = "#1F2937";
  container.style.zIndex = "-1000";

  container.innerHTML = `
    <div style="position: relative; width: 794px; min-height: 1123px; box-sizing: border-box; background: #ffffff; padding-bottom: 70px; display: flex; flex-direction: column; justify-content: space-between;">
      
      <!-- Watermark Background -->
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: hidden; pointer-events: none; opacity: 0.04; display: flex; flex-wrap: wrap; gap: 80px 40px; align-content: space-around; justify-content: space-around; transform: rotate(-25deg) scale(1.3); z-index: 1;">
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
        <span style="font-size: 28px; font-weight: 900; color: #000; text-transform: uppercase;">GLOBAL BIOMEDICALS INC</span>
      </div>

      <div style="position: relative; z-index: 2;">
        
        <!-- Top Navy Header Banner -->
        <div style="background-color: #1C2A3A; color: #ffffff; padding: 18px 28px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #C49A6C;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="${logoBase64}" alt="Logo" style="height: 48px; width: 48px; object-fit: contain; background: #ffffff; border-radius: 8px; padding: 2px;" />
            <div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.3px; color: #ffffff;">Global Biomedicals Inc</h1>
              <p style="margin: 2px 0 0 0; font-size: 11px; color: #C49A6C; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Diagnostics & Medical Technology</p>
            </div>
          </div>
          <div style="text-align: right; font-size: 11px; line-height: 1.5; color: #E2E8F0;">
            <div><strong>Phone:</strong> +91 9257984336 | +91 8529833535</div>
            <div><strong>Web:</strong> www.globalbiomedicals.net</div>
          </div>
        </div>

        <!-- Subheader Ribbon Banner -->
        <div style="background-color: #C49A6C; color: #ffffff; text-align: center; padding: 10px; font-size: 13px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: inset 0 -2px 5px rgba(0,0,0,0.15);">
          OFFICIAL PRODUCT SPECIFICATION BROCHURE
        </div>

        <!-- Content Area -->
        <div style="padding: 24px 28px;">

          <!-- Main Product Title Banner -->
          <h2 style="font-size: 18px; font-weight: 800; color: #1C2A3A; margin: 0 0 20px 0; line-height: 1.35; border-bottom: 2px solid #E5E7EB; padding-bottom: 10px;">
            ${cleanTitle}
          </h2>

          <!-- Upper Section: 2 Columns (Image Card + Specs Table) -->
          <div style="display: flex; gap: 20px; margin-bottom: 24px;">
            
            <!-- Left Column: Product Image Box -->
            <div style="flex: 1; border: 2px solid #E5E7EB; border-radius: 12px; padding: 16px; background: #FAFAFA; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
              <p style="font-size: 11px; font-weight: 700; color: #4B5563; text-align: center; margin: 0 0 12px 0;">
                ${rawTitle}
              </p>
              <div style="width: 100%; height: 230px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: #ffffff; border-radius: 8px; border: 1px solid #F0F0F0; padding: 10px;">
                <img 
                  src="${productImgBase64}" 
                  alt="${rawTitle}" 
                  style="max-width: 100%; max-height: 100%; object-fit: contain;" 
                />
              </div>
            </div>

            <!-- Right Column: Specs Table -->
            <div style="flex: 1; border: 2px solid #1C2A3A; border-radius: 12px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
              <div style="background-color: #1C2A3A; color: #ffffff; padding: 10px 16px; font-size: 12px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase;">
                KEY SPECIFICATIONS
              </div>
              <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                <tbody>
                  <tr style="border-bottom: 1px solid #E5E7EB; background-color: #ffffff;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A; width: 40%;">Brand:</td>
                    <td style="padding: 10px 14px; color: #374151;">${brand}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB; background-color: #F9FAFB;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A;">Model:</td>
                    <td style="padding: 10px 14px; color: #374151;">${model}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB; background-color: #ffffff;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A;">Instrument:</td>
                    <td style="padding: 10px 14px; color: #374151;">${instrument}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB; background-color: #F9FAFB;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A;">Usage:</td>
                    <td style="padding: 10px 14px; color: #374151;">${usage}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #E5E7EB; background-color: #ffffff;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A;">Automation:</td>
                    <td style="padding: 10px 14px; color: #374151;">${automation}</td>
                  </tr>
                  <tr style="background-color: #F9FAFB;">
                    <td style="padding: 10px 14px; font-weight: 700; color: #1C2A3A;">Size / Capacity:</td>
                    <td style="padding: 10px 14px; color: #374151;">${capacity}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <!-- Product Overview Section -->
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 14px; font-weight: 800; color: #1C2A3A; text-decoration: underline; text-underline-offset: 4px; margin: 0 0 10px 0; text-transform: uppercase;">
              PRODUCT OVERVIEW
            </h3>
            <p style="font-size: 11px; line-height: 1.6; color: #4B5563; margin: 0; text-align: justify;">
              The ${cleanTitle} is an advanced diagnostic analyzer designed for high performance, accuracy, and reliability in medical laboratories, hospitals, and clinical settings across India.
              ${desc}
            </p>
          </div>

          <!-- Lower Section: 2 Columns (Key Applications + Why Choose Us) -->
          <div style="display: flex; gap: 20px;">
            
            <!-- Left Box: Key Applications -->
            <div style="flex: 1; border: 2px solid #1C2A3A; border-radius: 12px; overflow: hidden; background: #ffffff;">
              <div style="background-color: #1C2A3A; color: #ffffff; padding: 10px 16px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase;">
                KEY APPLICATIONS
              </div>
              <ul style="margin: 0; padding: 14px 18px 14px 30px; font-size: 11px; line-height: 1.9; color: #374151;">
                <li style="color: #C49A6C;"><span style="color: #374151;">Clinical Diagnostic Laboratories</span></li>
                <li style="color: #C49A6C;"><span style="color: #374151;">Hospitals & Healthcare Centres</span></li>
                <li style="color: #C49A6C;"><span style="color: #374151;">Pathology & Testing Labs</span></li>
                <li style="color: #C49A6C;"><span style="color: #374151;">Blood Banks & Research Units</span></li>
                <li style="color: #C49A6C;"><span style="color: #374151;">Medical Colleges & Institutions</span></li>
              </ul>
            </div>

            <!-- Right Box: Why Choose Us -->
            <div style="flex: 1; border: 2px solid #1C2A3A; border-radius: 12px; overflow: hidden; background: #ffffff;">
              <div style="background-color: #1C2A3A; color: #ffffff; padding: 10px 16px; font-size: 11px; font-weight: 800; letter-spacing: 0.8px; text-transform: uppercase;">
                WHY CHOOSE GLOBAL BIOMEDICALS
              </div>
              <ul style="margin: 0; padding: 14px 18px 14px 30px; font-size: 11px; line-height: 1.9; color: #374151;">
                <li style="color: #2563EB;"><span style="color: #374151;">Trusted Biomedical Equipment Supplier</span></li>
                <li style="color: #2563EB;"><span style="color: #374151;">100% Genuine Leading Brand Products</span></li>
                <li style="color: #2563EB;"><span style="color: #374151;">Competitive Pricing & Warranty Support</span></li>
                <li style="color: #2563EB;"><span style="color: #374151;">Prompt Installation & Staff Training</span></li>
                <li style="color: #2563EB;"><span style="color: #374151;">Fast Express Delivery Across India</span></li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      <!-- Bottom Navy Footer Banner -->
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: #1C2A3A; color: #ffffff; padding: 12px 28px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; border-top: 2px solid #C49A6C; z-index: 5;">
        <div>
          <div style="font-weight: 800; font-size: 11px; color: #ffffff; text-transform: uppercase;">
            GLOBAL BIOMEDICALS INC - Diagnostic Instruments & Healthcare Solutions
          </div>
          <div style="color: #9CA3AF; margin-top: 2px;">
            Biomedical equipment sales, service, installation, AMC & calibration across India
          </div>
        </div>
        <div style="color: #C49A6C; font-weight: 700; text-align: right; text-transform: uppercase; font-size: 9px; letter-spacing: 0.5px;">
          Official Product Brochure | Confidential & Proprietary
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    const fileName = `${rawTitle.toLowerCase().replace(/[^a-z0-9]/g, "_")}_brochure.pdf`;
    pdf.save(fileName);
  } catch (err) {
    console.error("PDF generation failed:", err);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
