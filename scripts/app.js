var searchElem = document.getElementById('search');

function searchPages() {
  var searchTerm = searchElem.value;
  if(searchTerm){
    searchTerm = searchTerm.replace(" ", "");
    fetchPageDetails(searchTerm);
  }
}

function fetchPageDetails(pageName){
  console.log(pageName)
}