import "bootstrap";
import populateHTML from "./populateHTML";
import hookUpLanguageButtons from "./hookUpLanguageButtons";

// load English content for initial page display
populateHTML("en");

// hook up language buttons
hookUpLanguageButtons();

// initial page fade in after content is loaded
document.body.classList.remove("fade");
