import populateHTML from "./populateHTML";

export default function hookUpLanguageButtons() {
  // hook up English language button
  const selectEnglishButton = document.querySelector(
    '[data-content="languageselector_english"]'
  );
  selectEnglishButton.addEventListener("click", () => {
    populateHTML("en");
    selectEnglishButton.classList.add("active");
    selectGermanButton.classList.remove("active");
  });

  // hook up German language button
  const selectGermanButton = document.querySelector(
    '[data-content="languageselector_german'
  );
  selectGermanButton.addEventListener("click", () => {
    populateHTML("de");
    selectGermanButton.classList.add("active");
    selectEnglishButton.classList.remove("active");
  });
}
