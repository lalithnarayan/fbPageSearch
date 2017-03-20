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
      var urlCall = "/search?q=Bamboo&type=page&access_token="; 
        FB.api(urlCall, function(response) {
            debugger;
            console.log(response);

        });
        FB.api('/me', { fields: 'last_name' }, function(response) {
            console.log(response);
        });
    }

    var resultsEle = document.getElementById('results');
    var searchbar = document.getElementById('searchbar');
    var pos = 0;
    var id = setInterval(frame, 5);

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

logInWithFacebook = function() {
    FB.login(function(response) {
        if (response.authResponse) {
            alert('You are logged in &amp; cookie set!');
            // Now you can redirect the user or do an AJAX request to
            // a PHP script that grabs the signed request from the cookie.
        } else {
            alert('User cancelled login or did not fully authorize.');
        }
    });
    return false;
};
