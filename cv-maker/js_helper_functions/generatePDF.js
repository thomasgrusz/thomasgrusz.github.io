import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export async function generatePDF(cvFileName, language) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const cvPath = join(__dirname, "..", cvFileName);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  // await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  await page.goto(`file://${cvPath}`, {
    waitUntil: "networkidle2",
  });

  const outputPath = join(
    __dirname,
    "..",
    "..",
    "static",
    cvFileName.replace("html", "pdf")
  );
  await page.pdf({
    path: outputPath,
    pageRanges: "1-3",
    format: "A4",
    printBackground: false,
    margin: {
      top: "10mm",
    },
  });

  await browser.close();

  console.log(`PDF-CV for ${language} language generated: ${outputPath}`);
}

// Alternatives to get content
// await page.setContent("<h1>Hello, Puppeteer!</h1>");
// await page.goto("http://localhost:5500", { waitUntil: "networkidle2" });
