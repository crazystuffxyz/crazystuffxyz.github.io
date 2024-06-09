self.addEventListener('fetch', function(event) {
    var url = new URLSearchParams(self.location.search);
    var currenturl = event.request.url;
    var scope = atob(url.get("scope"));
    var token = atob(url.get("token"));

    if (event.request.url.includes(scope + 'uv/uv.') && event.request.url.endsWith('.js')) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    // Return the cached response if available
                    return cachedResponse;
                }

// Fetch the file from the network
return fetch(scope + currenturl.replace(location.origin + scope, "").replace("uv/", "vpn/"))
    .then(response => {
        // Clone the response before reading its body
        const responseToCache = response.clone();

        return response.text().then(text => {
            var thetext = text;
            thetext = thetext.replace(/theserviceworkerscriptscope/g, scope.slice(0, scope.length - 1))
                             .replace(/thebareservernodeurl/g, token);

            // Create a new Response object with the modified content
            const modifiedResponse = new Response(thetext, {
                headers: {
                    'Content-Type': response.headers.get('Content-Type')
                }
            });

            // Cache the modified response
            caches.open('dynamic-cache').then(cache => {
                cache.put(event.request, responseToCache);
            });

            return modifiedResponse;
        });
    })

                    .catch(error => {
                        // In case of an error, return a simple error response
                        console.error('Error fetching content:', error);
                        return new Response('Error fetching content: ' + error, {
                            status: 500,
                            statusText: 'Internal Server Error'
                        });
                    });
            })
        );
    }
});
