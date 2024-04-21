self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    async function makeFile(name, contenttype, contentPromise) {
        if (url.pathname === name) {
            event.respondWith(
                contentPromise
                    .then(content => {
                        return new Response(content.replace(/theserviceworkerscriptscope/g, self.registration.scope.slice(0, self.registration.scope.length - 1)).replace(/thebareservernodeurl/g, atob(self.registration.options.token)), {
                            status: 200,
                            headers: { 'Content-Type': contenttype }
                        });
                    })
            );
        }
    }

    async function getAndReplaceFromUrl(url) {
        try {
            var response = await fetch(url);
            var content = await response.text();
            return content;
        } catch (e) {
            return "";
        }
    }

    makeFile(self.registration.scope + "uv/uv.config.js", "application/javascript", getAndReplaceFromUrl(self.registration.scope + "vpn/uv.config.js"));
    makeFile(self.registration.scope + "uv/uv.bundle.js", "application/javascript", getAndReplaceFromUrl(self.registration.scope + "vpn/uv.bundle.js"));
    makeFile(self.registration.scope + "uv/uv.handler.js", "application/javascript", getAndReplaceFromUrl(self.registration.scope + "vpn/uv.config.js"));
    makeFile(self.registration.scope + "uv/uv.sw.js", "application/javascript", getAndReplaceFromUrl(self.registration.scope + "vpn/uv.sw.js"));
});
