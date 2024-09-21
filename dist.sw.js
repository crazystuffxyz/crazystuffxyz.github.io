try{
function setUp(scope, bare){
  importScripts(scope + "/uv/uv.bundle.js");
  importScripts(scope + "./uv/uv.config.js");
  importScripts(scope + "./uv/uv.sw.js");
  __uv$config.prefix = __uv$config.prefix.replace("theserviceworkerscriptscope", scope);
  __uv$config.config = __uv$config.config.replace("theserviceworkerscriptscope", scope);
  __uv$config.bundle = __uv$config.bundle.replace("theserviceworkerscriptscope", scope);
  __uv$config.handler = __uv$config.handler.replace("theserviceworkerscriptscope", scope);
  __uv$config.sw = __uv$config.sw.replace("theserviceworkerscriptscope", scope);
  __uv$config.bare = bare;
  const sw = new UVServiceWorker(__uv$config);
  let userKey = new URL(location).searchParams.get('userkey');
  self.addEventListener("fetch", (event) => {
    var url = new URLSearchParams(self.location.search);
    var currenturl = event.request.url;
    if(event.request.url.endsWith("uv/uv.config.js")){
      event.respondWith(
        new Response("self.__uv$config = " + JSON.stringify(__uv$config), {
          headers: {
            'Content-Type': "application/javascript"
          }
        })
      )
    } else{
      event.respondWith(sw.fetch(event));
    }
  });
}
var url = new URLSearchParams(self.location.search);
var scope = atob(url.get("scope"));
var bare = atob(url.get("bare"));
setUp(scope, bare);
} catch(e){
  console.log(e.message);
}
