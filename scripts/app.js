var searchElem = document.getElementById('search');

function searchPages() {
  var searchTerm = searchElem.value;
  if(searchTerm){
    searchTerm = searchTerm.replace(" ", "");
  }
}
