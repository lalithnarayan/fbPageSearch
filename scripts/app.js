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
            fetchPageDetails(response.data);
          }
        });
    }
}

function fetchPageDetails(data){
  var pageListData = []
  for(var i=0;i<data.length;i++){
    var urlCall = "/"+data[0].id + "?fields=category,cover,about,name";
      FB.api(urlCall, function(response) {
        if(response){
          
          var tempItem = '<li class="result-wrp clearfix"><div class="page-image"><img src="'+response.cover.source+'"></div><div class="res-right-wrp"><div class="page-name">'+ response.name +'</div><div class="page-cat">'+response.category+'</div><div class="page-desc"><p>'+response.about +'</p></div></div></li>'
          pageListData.push(tempItem) 
        }
    });
  }
  renderPage(pageListData)
  
}

function renderPage(data){
  
  var resultsEle = document.getElementById('results');
  debugger;
  resultsEle.style.display = 'block';
  var resultsContainer = document.getElementById('result-holder');
  resultsContainer.innerHtml = pageListData;
}


