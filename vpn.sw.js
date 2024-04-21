self.addEventListener('fetch', (event) => {
const url = new URL(event.request.url);
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
    thetext = await thetext.replace(/theserviceworkerscriptscope/g, self.localStorage.scopeforyouknow.slice(0, self.localStorage.scopeforyouknow.length - 1)).replace(/thebareservernodeurl/g, atob(self.localStorage.tokenforbare));
    return thetext;
    } catch(e){
      return "";
    }
  }
makeFile(self.localStorage.scopeforyouknow + "uv/uv.config.js", "application/javascript", getFromUrl(self.localStorage.scopeforyouknow + "vpn/uv.config.js"));
makeFile(self.localStorage.scopeforyouknow + "uv/uv.bundle.js", "application/javascript", getFromUrl(self.localStorage.scopeforyouknow + "vpn/uv.bundle.js"));
makeFile(self.localStorage.scopeforyouknow + "uv/uv.handler.js", "application/javascript", getFromUrl(self.localStorage.scopeforyouknow + "vpn/uv.config.js"));
makeFile(self.localStorage.scopeforyouknow + "uv/uv.sw.js", "application/javascript", getFromUrl(self.localStorage.scopeforyouknow + "vpn/uv.sw.js"));
});
