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
    return await response.text();
    } catch(e){
      return "";
    }
  }
makeFile(self.registration.scope + "uv/uv.config.js", "application/javascript", getFromUrl(self.registration.scope + "vpn/uv.config.js").replace(/theserviceworkerscriptscope/g, self.registration.scope.slice(0, self.registration.scope.length - 1)).replace(/thebareservernodeurl/g, atob(self.registration.options.token)));
makeFile(self.registration.scope + "uv/uv.bundle.js", "application/javascript", getFromUrl(self.registration.scope + "vpn/uv.bundle.js").replace(/theserviceworkerscriptscope/g, self.registration.scope.slice(0, self.registration.scope.length - 1)).replace(/thebareservernodeurl/g, atob(self.registration.options.token)));
makeFile(self.registration.scope + "uv/uv.handler.js", "application/javascript", getFromUrl(self.registration.scope + "vpn/uv.config.js").replace(/theserviceworkerscriptscope/g, self.registration.scope.slice(0, self.registration.scope.length - 1)).replace(/thebareservernodeurl/g, atob(self.registration.options.token)));
makeFile(self.registration.scope + "uv/uv.sw.js", "application/javascript", getFromUrl(self.registration.scope + "vpn/uv.sw.js").replace(/theserviceworkerscriptscope/g, self.registration.scope.slice(0, self.registration.scope.length - 1)).replace(/thebareservernodeurl/g, atob(self.registration.options.token)));
});
