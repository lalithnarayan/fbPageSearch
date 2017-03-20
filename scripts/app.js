var searchElem = document.getElementById('search');
var accessToken = 1861865227430347;

function searchPages() {
    var searchTerm = searchElem.value;
    if (searchTerm) {
        searchTerm = searchTerm.replace(" ", "");
        fetchPageDetails(searchTerm);
    }
}

function fetchPageDetails(pageName) {
    //GET for Page Node Details
    if (FB) {
        var urlCall = "/search?q=" + pageName + "&type=page&access_token=";
        FB.api(urlCall, function(response) {
          if(response.data){
              renderPage()
          }
        });
    }
}
function renderPage(){
    var resultsEle = document.getElementById('results');
    var searchbar = document.getElementById('searchbar');
    var pos = 0;
    var id = setInterval(frame, 5);
    resultsEle.style.display = 'block';
    function frame() {
        if (pos == -400) {
            clearInterval(id);

        } else {
            pos--;
            resultsEle.style.top = pos + 'px';
            searchbar.style.top = pos / 3 + 'px';
        }
    }
}

