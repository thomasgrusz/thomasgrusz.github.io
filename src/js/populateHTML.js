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
    const contentKey = element.dataset.content;
    if (content[contentKey][language]) {
      element.textContent = content[contentKey][language];
    }
    if (content[contentKey][`${language}_href`]) {
      element.href = content[contentKey][`${language}_href`];
    }
  });
}
