// Declare a new function named search
async function search() {
    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;
    // empty the input field
    document.forms.searchForm.term.value = '';
    // read the json
    let rawData = await fetch('/api/pdfs/' + searchTerm);
    // convert json to a javascript data structure
    let pdfs = await rawData.json();
    // create an variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${pdfs.length} results.</p>
    `;
    // loop through the cats
    for (let pdf of pdfs) {
      console.log(pdf)
      html += `
        <section>
          <h2>${pdf.pdfsDescription.info.Title}</h2>
          <a target="_blank" href="pdfs/${pdf.pdfsName}">
          <p>${pdf.pdfsDescription.info.Author}</p>
        </section>
      `;
    }
    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');
    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }
  