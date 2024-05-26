self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.pathname.startsWith('/youareanidiot.org/project/')) {
    event.respondWith(handleProjectRequest(event.request));
  }
});

async function handleProjectRequest(request) {
  var url = request.url.replace("/youareanidiot.org/project/", "/");
  const response = await fetch('https://bvguchefnjimwondhxbygrfhuedijm.github.io/test/Assets' + url);

  if (response.status !== 404) {
    return Response.redirect('https://bvguchefnjimwondhxbygrfhuedijm.github.io/test/Assets' + url, 302);
  } else {
    return Response.redirect('https://hugvyfctudyrxxdz1r1zc55z6fcwhviewgbhjc.github.io/projects/Assets' + url, 302);
  }
}
