self.addEventListener('fetch', (event) => {
  function decodeStr(input) {
  const chars = 'MZAPLQXKOSWNCDJIEBVFHRUGYTzmxncbvlaksjdhfgqpwoeiruty5049382716/+';
  let output = '';
  let i = 0;

  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    const index1 = chars.indexOf(input.charAt(i++));
    const index2 = chars.indexOf(input.charAt(i++));
    const index3 = chars.indexOf(input.charAt(i++));
    const index4 = chars.indexOf(input.charAt(i++));
    const a = (index1 << 2) | (index2 >> 4);
    const b = ((index2 & 15) << 4) | (index3 >> 2);
    const c = ((index3 & 3) << 6) | index4;

    output += String.fromCharCode(a);
    if (index3 !== 64) output += String.fromCharCode(b);
    if (index4 !== 64) output += String.fromCharCode(c);
  }

  return output;
}
function encodeStr(input) {
  const chars = 'MZAPLQXKOSWNCDJIEBVFHRUGYTzmxncbvlaksjdhfgqpwoeiruty5049382716/+';
  let output = '';
  let i = 0;

  while (i < input.length) {
    const a = input.charCodeAt(i++);
    const b = input.charCodeAt(i++);
    const c = input.charCodeAt(i++);
    const index1 = a >> 2;
    const index2 = ((a & 3) << 4) | (b >> 4);
    const index3 = isNaN(b) ? 64 : ((b & 15) << 2) | (c >> 6);
    const index4 = isNaN(c) ? 64 : c & 63;

    output += chars.charAt(index1) + chars.charAt(index2) + chars.charAt(index3) + chars.charAt(index4);
  }

  return output;
}
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
makeFile(urlParams.get("scope") + "uv/uv.config.js", "application/javascript", encodeStr(getFromUrl(urlParams.get("scope") + "vpn/uv.config.js")));
makeFile(urlParams.get("scope") + "uv/uv.bundle.js", "application/javascript", encodeStr(getFromUrl(urlParams.get("scope") + "vpn/uv.bundle.js")));
makeFile(urlParams.get("scope") + "uv/uv.handler.js", "application/javascript", encodeStr(getFromUrl(urlParams.get("scope") + "vpn/uv.config.js")));
makeFile(urlParams.get("scope") + "uv/uv.sw.js", "application/javascript", encodeStr(getFromUrl(urlParams.get("scope") + "vpn/uv.sw.js")));
});
