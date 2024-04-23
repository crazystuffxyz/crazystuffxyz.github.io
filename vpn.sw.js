self.addEventListener('fetch', function(event) {
  var url = new URLSearchParams(self.location.search);
  var currenturl = event.request.referrer;
  var scope = atob(url.get("scope"));
  var token = atob(url.get("token"));
  var thetext;
  if (event.request.url.includes(scope + 'uv/uv.')) {
    event.respondWith(
      fetch(scope + currenturl.replace(location.origin + scope, "").replace("uv/", "vpn/"))
        .then(function(response) {
          text = response.text(); 
        })
        .then(function(text) {
          var thetext = text;
          console.log(thetext);
          thetext = thetext.replace(/theserviceworkerscriptscope/g, scope.slice(0, scope.length - 1)).replace(/thebareservernodeurl/g, token);
          // Create a new Response object with the fetched content
          return new Response(thetext, {
            headers: {
              'Content-Type': response.headers.get('Content-Type')
            }
          });
        })
        .catch(function(error) {
          // In case of an error, return a simple error response
          return new Response('Error fetching content: ' + error, {
            status: 500,
            statusText: 'Internal Server Error'
          });
        })
    );
  }
});
