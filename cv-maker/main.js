// Import file system tools
import { fileURLToPath } from "url";
import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";

import { injectContent } from "./js_helper_functions/injectContent.js";
import { generatePDF } from "./js_helper_functions/generatePDF.js";

// Define file system variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function makeCvFromContentJson() {
  try {
    // Get content.json
    const contentFilePath = join(
      __dirname,
      "..",
      "src",
      "assets",
      "content.json"
    );
    const jsonData = await readFile(contentFilePath, "utf8");
    const content = JSON.parse(jsonData);

    // Get the cv template
    const cvTemplateFilePath = join(__dirname, "cv_template.html");
    const cvTemplate = await readFile(cvTemplateFilePath, "utf8");

    // Replace PLACEHOLDERTEXT in cvTemplate with 'content' of 'language' and save .html and .pdf files
    const languages = ["en", "de"];
    for (const language of languages) {
      const cv = injectContent(content, language, cvTemplate);

      // Write HTML-CV
      const cvFileName = `CV_Thomas_Grusz_${language}_2023.html`;
      const outputPath = join(__dirname, cvFileName);
      await writeFile(outputPath, cv, "utf8");
      console.log(`HTML-CV for ${language} language generated: ${outputPath}`);

      // Generate PDF and save file in 'homepage-thg/static/'
      generatePDF(cvFileName, language);
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

makeCvFromContentJson();
