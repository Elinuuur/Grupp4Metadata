// Declare a new function named search
async function search() {
    // read the user input from the term field in the form searchForm
    let searchTerm = document.forms.searchForm.term.value;
    // empty the input field
    document.forms.searchForm.term.value = '';
    // read the json
    let rawData = await fetch('/api/powerpoints/' + searchTerm);
    // convert json to a javascript data structure
    let powerpoints = await rawData.json();
    // create an variable name that initially is an empty string
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${powerpoints.length} results.</p>
    `;
    // loop through the cats
    for (let powerpoints of powerpoints) {
      html += `
        <section>
          <h2>${powerpoints.powerpointsName}</h2>
          <img src="powerpoints/${powerpoint.meta.image}">
          <p>${powerpoint.meta.description}</p>
        </section>
      `;
    }
    // Grab the element/tag with the class searchResults
    let searchResultsElement = document.querySelector('.searchResults');
    // Change the content of the searchResults element
    searchResultsElement.innerHTML = html;
  }
  