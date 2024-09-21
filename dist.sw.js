try{
function setUp(thepath, bare){
  importScripts(thepath + "/uv/uv.bundle.js");
  importScripts(thepath + "./uv/uv.config.js");
  importScripts(thepath + "./uv/uv.sw.js");
  __uv$config.prefix = __uv$config.prefix.replace("theserviceworkerscriptscope", thepath);
  __uv$config.config = __uv$config.config.replace("theserviceworkerscriptscope", thepath);
  __uv$config.bundle = __uv$config.bundle.replace("theserviceworkerscriptscope", thepath);
  __uv$config.handler = __uv$config.handler.replace("theserviceworkerscriptscope", thepath);
  __uv$config.sw = __uv$config.sw.replace("theserviceworkerscriptscope", thepath);
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
var url = new URLSearchParams(self.location.search);=
var bare = atob(url.get("bare"));
setUp(atob(url.get("scope")), bare);
} catch(e){
  console.log(e.message);
}
