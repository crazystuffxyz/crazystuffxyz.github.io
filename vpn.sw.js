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
    thetext = await thetext.replace(/theserviceworkerscriptscope/g, urlParams.get("scope").slice(0, urlParams.get("scope").length - 1)).replace(/thebareservernodeurl/g, atob(urlParams.get("token")));
    return thetext;
    } catch(e){
      return "";
    }
  }
makeFile(urlParams.get("scope") + "uv/uv.config.js", "application/javascript", getFromUrl(urlParams.get("scope") + "vpn/uv.config.js"));
makeFile(urlParams.get("scope") + "uv/uv.bundle.js", "application/javascript", getFromUrl(urlParams.get("scope") + "vpn/uv.bundle.js"));
makeFile(urlParams.get("scope") + "uv/uv.handler.js", "application/javascript", getFromUrl(urlParams.get("scope") + "vpn/uv.config.js"));
makeFile(urlParams.get("scope") + "uv/uv.sw.js", "application/javascript", getFromUrl(urlParams.get("scope") + "vpn/uv.sw.js"));
});
