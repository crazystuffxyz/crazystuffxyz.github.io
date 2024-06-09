self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.map(function(name) {
                    return caches.delete(name);
                })
            );
        }).catch(error => {
            console.log('Error during installation:', error);
        })
    );
});

self.addEventListener('fetch', function(event) {
    var url = new URLSearchParams(self.location.search);
    var currenturl = event.request.url;
    var scope = atob(url.get("scope"));
    var token = atob(url.get("token"));

    if (event.request.url.includes(scope + 'uv/uv.') && event.request.url.endsWith('.js')) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(scope + currenturl.replace(location.origin + scope, "").replace("uv/", "vpn/"))
                    .then(response => {
                        // Clone the response before reading its body
                        let responseToCache;
                        try {
                            responseToCache = response.clone();
                        } catch (error) {
                            console.log('Error cloning response:', error);
                            responseToCache = response;
                        }

                        return responseToCache.text().then(text => {
                            var thetext = text;
                            thetext = thetext.replace(new RegExp('theserviceworkerscriptscope', 'g'), scope.slice(0, scope.length - 1)).replace(new RegExp('thebareservernodeurl', 'g'), token);
                            console.log(thetext);

                            const modifiedResponse = new Response(thetext, {
                                headers: {
                                    'Content-Type': response.headers.get('Content-Type')
                                }
                            });

                            caches.open('dynamic-cache').then(cache => {
                                cache.put(event.request, modifiedResponse.clone());
                            }).catch(error => {
                                console.log('Error opening cache:', error);
                            });

                            return modifiedResponse;
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching content:', error);
                    });
            }).catch(error => {
                console.log('Error matching cache:', error);
            })
        );
    }
});
