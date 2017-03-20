var searchElem = document.getElementById('search');
var accessToken = 1861865227430347;

function searchPages() {
    var searchTerm = searchElem.value;
    if (searchTerm) {
        // searchTerm = searchTerm.replace(" ", "");
        getAllPages(searchTerm);
    }
}

function getAllPages(pageName) {
    //GET for Page Node Details
    if (FB) {
        var urlCall = "/search?q=" + pageName + "&type=page&access_token=";
        FB.api(urlCall, function(response) {
          if(response.data){
            console.log(response.data);
              fetchPageDetails(response.data);
              renderPage(response.data);
          }
        });
    }
}

function fetchPageDetails(data){
  var urlCall = "/search?q=" + pageName + "&type=page&access_token=";
        FB.api(urlCall, function(response) {
          if(response.data){
              fetchPageDetails(response.data);
              renderPage()
          }
        });
}
function renderPage(data){
    var resultsEle = document.getElementById('results');
    var searchbar = document.getElementById('searchbar');
    var pos = 0;
    var id = setInterval(frame, 5);
    resultsEle.style.display = 'block';
    // function frame() {
    //     if (pos == -400) {
    //         clearInterval(id);
    //     } else {
    //         pos--;
    //         resultsEle.style.top = pos + 'px';
    //         searchbar.style.top = pos / 3 + 'px';
    //     }
    // }
    var listItems =[];
    // Creating the list
    for(var i=0;i<data.length;i++){
      var listItem = '<li class="result-wrp clearfix">
                        <div class="page-image"><img src="'+ +'"></div>
                        <div class="res-right-wrp">
                            <div class="page-name">'+ Coca-Cola +'</div>
                            <div class="page-cat">'+Category+'</div>
                            <div class="page-desc">
                                <p>'+Lorem Ipsum+'</p>
                            </div>
                        </div>
                    </li>'
      listItems.push(listItem);
    }

}


