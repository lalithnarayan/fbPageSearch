var searchElem = document.getElementById('search');
var searchResults = [];
var pageListData = "";

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
            if (response.data) {
                fetchPageDetails(response.data);
            }
        });
    }
}

function fetchPageDetails(data) {
    for (var i = 0; i < data.length; i++) {
        var urlCall = "/" + data[i].id + "?fields=category,cover,about,name";
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
}

function renderPage(data) {

    var favStatus;
    var resultsContainer = document.getElementById('result-holder');
    var tempImg = data.cover ? data.cover.source : "assets/fb-art.png";
    var tempItem = '<li class="result-wrp clearfix"><div class="page-image"><img src="' + tempImg + '"></div><div class="res-right-wrp"><div class="page-name">' + data.name + '</div><div class="page-cat">' + data.category + '</div><div class="page-desc"><p>' + data.about + '</p></div><div class="page-fav" data-fav="' + data.favStatus + '"onclick="favoriteItem(this)">LIKE</div></div></li>'
    pageListData += tempItem;
    resultsContainer.innerHTML = pageListData;
    var resultsEle = document.getElementById('results');
    resultsEle.style.display = 'block';
}

function favoriteItem(ele) {
    var status = ele.getAttribute("data-fav");
    var nodeList = Array.prototype.slice.call( document.getElementById('result-holder').children );
    nodeList.indexOf( ele.parentElement.parentElement );
    debugger;
    if (status=='false') {
        ele.innerHTML = 'LIKED'
    } else {
        ele.innerHTML = 'LIKE'
    }

}

function closeSearchResults() {
    var resultsEle = document.getElementById('results');
    resultsEle.style.display = 'none';
}
