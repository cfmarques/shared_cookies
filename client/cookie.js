var CookieHandler = (function() {

  var url = 'http://server.dev:4567/cookie';
  var cookieName = '_client.cookie';

  var createCookie = function(data) {
    document.cookie = "_client.cookie=" + data;
  };

  var showCookieValues = function() {
    var cookie = getCookie();
    document.getElementById('cookie-id').innerHTML = cookie.id;
    document.getElementById('cookie-creation').innerHTML = cookie.creation_time;
  };

  var getCookie = function() {
    var re = new RegExp(cookieName + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? JSON.parse(unescape(value[1])) : null;
  }

  var onRequestComplete = function() {
      debugger;
    var COMPLETE = 4
    var OK = 200;

    if (this.readyState === COMPLETE && this.status == OK) {
      createCookie(this.response);
      showCookieValues();
    }
  };

  var makeRequest = function() {
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = onRequestComplete;
    httpRequest.open('POST', url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
    httpRequest.withCredentials = true;
    httpRequest.send();
  };

  var init = function() {
    makeRequest();
  };

  return {
    init : init
  };

})();

window.addEventListener("load", CookieHandler.init);
