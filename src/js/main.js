// Enable tooltip for email address in the footer - check css/style.css .custom-tooltip for details
new bootstrap.Tooltip(document.getElementById('email'));

// Load the site content and populate site
// This code also contains the logic for switching languages using the selector buttons at the top of the page

// get all html elements with english/german text (i.e. data-lang attribute)
const contentElements = document.querySelectorAll('[data-lang]');
// get English button
const selectEnglish = document.getElementById('selectEnglish');
// get German button
const selectGerman = document.getElementById('selectGerman');

// function to populate HTML elements with content based on the selected language
function populateHTMLcontent(language) {
  contentElements.forEach((element) => {
    const translationKey = element.dataset.lang;
    // Check if there is a content entry for the selected language and apply
    if (englishGermanContent[translationKey][language]) {
      element.textContent = englishGermanContent[translationKey][language];
    }
    // Check if there is a hyperlink entry for the selected language and apply
    if (englishGermanContent[translationKey][`${language}_href`]) {
      element.href = englishGermanContent[translationKey][`${language}_href`];
    }
  });
  // Change colors of language selector buttons
  changeButtonColor(language);
}

// function to change color of language selector buttons
function changeButtonColor(language) {
  if (language === 'en') {
    selectEnglish.classList.add('fw-semibold', 'text-light', 'bg-info');
    selectEnglish.classList.remove('bg-light');
    selectGerman.classList.add('text-dark', 'bg-light');
    selectGerman.classList.remove('fw-semibold', 'text-light', 'bg-info');
  } else {
    selectEnglish.classList.remove('fw-semibold', 'text-light', 'bg-info');
    selectEnglish.classList.add('bg-light');
    selectGerman.classList.remove('text-dark', 'bg-light');
    selectGerman.classList.add('fw-semibold', 'text-light', 'bg-info');
  }
}

// add event listener for switching to English to button
selectEnglish.addEventListener('click', () => {
  populateHTMLcontent('en');
});
// add event listener for switching to German to button
selectGerman.addEventListener('click', () => {
  populateHTMLcontent('de');
});

// load site content from JSON file and store it in "englishGermanContent" variable
// then populate the site with English content
let englishGermanContent;

async function fetchJSON() {
  try {
    const response = await fetch('./data/content.json');
    englishGermanContent = await response.json();
    populateHTMLcontent('en'); // initial content injection - "en" for English, "de" for German
    document.body.classList.remove('fade'); // make site visible
  } catch (err) {
    console.log('Error leading JSON: error');
    document.body.innerHTML = `
      <div class="row text-center align-items-center" style="height: 100vh">
        <h1 class="col display-5">Oooops....something went wrong!</h1>
      </div>`;
    document.body.classList.remove('fade');
  }
}
fetchJSON();
