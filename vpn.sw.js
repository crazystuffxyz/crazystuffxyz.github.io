self.addEventListener('fetch', (event) => {
const url = new URL(event.request.url);
const urlParams = new URLSearchParams(location.search);
console.log(location.search);
function makeFile(name, contenttype, content){
  eval(`
  if (url.pathname === '` + name + `') {
    event.respondWith(
      fetch('.')
        .then(response => {
            return new Response(decodeStr('` + content + `'), {
              status: 200,
              headers: { 'Content-Type': '` + contenttype + `' }
            });
        })
    );
  }
  `);
}
  async function getFromUrl(url){
    try{
    var response = await fetch(url);
    var thetext = await response.text();
    console.log(thetext);
    thetext = await thetext.replace(/theserviceworkerscriptscope/g, urlParams.scope.slice(0, urlParams.scope.length - 1)).replace(/thebareservernodeurl/g, atob(urlParams.token));
    return thetext;
    } catch(e){
      return "";
    }
  }
makeFile(urlParams.scope + "uv/uv.config.js", "application/javascript", getFromUrl(urlParams.scope + "vpn/uv.config.js"));
makeFile(urlParams.scope + "uv/uv.bundle.js", "application/javascript", getFromUrl(urlParams.scope + "vpn/uv.bundle.js"));
makeFile(urlParams.scope + "uv/uv.handler.js", "application/javascript", getFromUrl(urlParams.scope + "vpn/uv.config.js"));
makeFile(urlParams.scope + "uv/uv.sw.js", "application/javascript", getFromUrl(urlParams.scope + "vpn/uv.sw.js"));
});
