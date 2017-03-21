var searchElem = document.getElementById('search');
var searchResults = [];
var pageListData = "";
var app_id =1861865227430347;
var app_secret="ee4c744fad6e8205ccbf1e8981bfa481";

function searchPages() {
    var searchTerm = searchElem.value;
    if (searchTerm) {
        getAllPages(searchTerm);
    }
}

function getAllPages(pageName) {
    //GET for Page Node Details
    if (FB) {
        var urlCall = "/search?q=" + pageName + "&type=page&access_token="+app_id+"|"+app_secret;
        FB.api(urlCall, function(response) {
            if (response.data) {
                fetchPageDetails(response.data);
            }
        });
    }
}

function fetchPageDetails(data) {
    for (var i = 0; i < data.length; i++) {
        var urlCall = "/" + data[i].id + "?fields=category,cover,about,name"+"&type=page&access_token="+app_id+"|"+app_secret;
        FB.api(urlCall, function(response) {
            if (response) {
                if (response.isFav) {
                    response.favStatus = true;

                } else {
                    response.favStatus = false;
                }
                searchResults.push(response);
                renderPage(response);
            }
        });
    }
    var resultsEle = document.getElementById('results');
    resultsEle.style.display = 'block';
}

function renderPage(data) {
    var resultsContainer = document.getElementById('result-holder');
    var tempImg = data.cover ? data.cover.source : "assets/fb-art.png";
    var tempItem = '<li class="result-wrp clearfix"><div class="page-image"><img src="' + tempImg + '"></div><div class="res-right-wrp"><div class="page-name">' + data.name + '</div><div class="page-cat">' + data.category + '</div><div class="page-desc"><p>' + data.about + '</p></div><div class="page-fav" data-fav="' + data.favStatus + '"onclick="favoriteItem(this)">LIKE</div></div></li>'
    pageListData += tempItem;
    resultsContainer.innerHTML = pageListData;
    
}

function favoriteItem(ele) {
    var status = ele.getAttribute("data-fav");
    var parentElement =ele.parentElement.parentElement.parentElement;
    var nodeList = Array.prototype.slice.call(parentElement.children);
    if(!searchResults){
      searchResults = JSON.parse(window.localStorage.getItem("searchResults"));
    }
    var clcikedIndex = nodeList.indexOf(ele.parentElement.parentElement);
    if (status == 'false') {
        ele.innerHTML = 'LIKED';
        searchResults[clcikedIndex].favStatus = "true";
    } else {
        ele.innerHTML = 'LIKE';
        searchResults[clcikedIndex].favStatus = "false";
    }
    ele.setAttribute("data-fav", searchResults[clcikedIndex].favStatus);
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
}

function closeSearchResults() {
    var resultsEle = document.getElementById('results');
    resultsEle.style.display = 'none';
}

function closeFavoriteResults() {
    var favEle = document.getElementById('favorite');
    favEle.style.display = 'none';
}

function showFav() {
    var favSavedList ='';
    var favouriteResultList = JSON.parse(window.localStorage.getItem("searchResults"));
    var favoriteEle = document.getElementById('favorite');
    var favContainer = document.getElementById('fav-holder');
    if (favouriteResultList) {
        for (var i = 0; i < favouriteResultList.length; i++) {
            var data = favouriteResultList[i];
            var displayClass= data.favStatus == 'true' ? "" : "hide";
            var tempImg = data.cover ? data.cover.source : "assets/fb-art.png";
            var tempItem = '<li class="result-wrp clearfix '+ displayClass+'"><div class="page-image"><img src="' + tempImg + '"></div><div class="res-right-wrp"><div class="page-name">' + data.name + '</div><div class="page-cat">' + data.category + '</div><div class="page-desc"><p>' + data.about + '</p></div><div class="page-fav" data-fav="' + data.favStatus + '"onclick="favoriteItem(this)">LIKED</div></div></li>'
            favSavedList += tempItem;
            favContainer.innerHTML = favSavedList;
        }
        favoriteEle.style.display = 'block';
    } else {
        alert("You have not liked any Pages yet");
    }
}
