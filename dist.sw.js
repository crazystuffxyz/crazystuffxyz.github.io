function ensureTrailingSlash(path) {
  return path.endsWith('/') ? path : path + '/';
}

try {
  function setUp(thepath, bare) {
    thepath = ensureTrailingSlash(thepath); // Ensure trailing slash

    importScripts(thepath + "uv/uv.bundle.js");
    importScripts(thepath + "uv/uv.config.js");
    importScripts(thepath + "uv/uv.sw.js");

    // Update the config paths
    __uv$config.prefix = __uv$config.prefix.replace("theserviceworkerscriptscope", thepath);
    __uv$config.config = __uv$config.config.replace("theserviceworkerscriptscope", thepath);
    __uv$config.bundle = __uv$config.bundle.replace("theserviceworkerscriptscope", thepath);
    __uv$config.handler = __uv$config.handler.replace("theserviceworkerscriptscope", thepath);
    __uv$config.sw = __uv$config.sw.replace("theserviceworkerscriptscope", thepath);
    __uv$config.bare = bare;

    const sw = new UVServiceWorker(__uv$config);

    self.addEventListener("fetch", (event) => {
      console.log(event.request.url);
      event.request.url.endsWith("uv/uv.config.js");
      if (event.request.url.endsWith("uv/uv.config.js")) {
        event.respondWith(
          new Response("self.__uv$config = " + JSON.stringify(__uv$config), {
            headers: {
              'Content-Type': "application/javascript"
            }
          })
        );
      } else {
        event.respondWith(sw.fetch(event));
      }
    });
  }

  var url = new URLSearchParams(self.location.search);
  var bare = atob(url.get("bare"));
  var scope = atob(url.get("scope"));

  console.log(scope);
  setUp(scope, bare);

} catch (e) {
  console.log(e.message);
}
