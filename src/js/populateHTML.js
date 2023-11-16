//
// Populate the HTML with content of chosen language (given as an attribute)
//

// get all content for the page
import content from "../assets/content.json";

// get all html elements, that will be loaded with content
const contentElements = document.querySelectorAll("[data-content]");

// function to populate HTML with content of chosen language
export default function populateHTML(language) {
  contentElements.forEach((element) => {
    const translationKey = element.dataset.content;
    if (content[translationKey][language]) {
      element.textContent = content[translationKey][language];
    }
    if (content[translationKey][`${language}_href`]) {
      element.href = content[translationKey][`${language}_href`];
    }
  });
}
