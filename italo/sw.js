const staticCacheName = 'site-static-v0.1.0';
const dynamicCacheName = 'site-dynamic-v0.1.0';

const limitCacheSize = (name, size) =>
    caches.open(name).then(cache =>
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    );

const assets = [
    './',
    './index.html',
    'js/init.js',
    'js/register.js',
    'data.json',

    'https://cdn.jsdelivr.net/gh/SincoSoft-GoldenBerry/S5@master/v2/s5.js',
    'https://cdn.jsdelivr.net/gh/SincoSoft-GoldenBerry/S5@master/s5.request.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',

    'css/fa/css/all.css',
    'css/fa/css/all.min.css',
    'css/fa/css/brands.css',
    'css/fa/css/brands.min.css',
    'css/fa/css/fontawesome.css',
    'css/fa/css/fontawesome.min.css',
    'css/fa/css/regular.css',
    'css/fa/css/regular.min.css',
    'css/fa/css/solid.css',
    'css/fa/css/solid.min.css',
    'css/fa/css/svg-with-js.css',
    'css/fa/css/svg-with-js.min.css',
    'css/fa/css/v4-shims.css',
    'css/fa/css/v4-shims.min.css',

    'css/fa/webfonts/fa-brands-400.eot',
    'css/fa/webfonts/fa-brands-400.svg',
    'css/fa/webfonts/fa-brands-400.ttf',
    'css/fa/webfonts/fa-brands-400.woff',
    'css/fa/webfonts/fa-brands-400.woff2',
    'css/fa/webfonts/fa-regular-400.eot',
    'css/fa/webfonts/fa-regular-400.svg',
    'css/fa/webfonts/fa-regular-400.ttf',
    'css/fa/webfonts/fa-regular-400.woff',
    'css/fa/webfonts/fa-regular-400.woff2',
    'css/fa/webfonts/fa-solid-900.eot',
    'css/fa/webfonts/fa-solid-900.svg',
    'css/fa/webfonts/fa-solid-900.ttf',
    'css/fa/webfonts/fa-solid-900.woff',
    'css/fa/webfonts/fa-solid-900.woff2',

    'css/index.css',

    'images/icons/icon-72x72.png',
    'images/icons/icon-96x96.png',
    'images/icons/icon-114x114.png',
    'images/icons/icon-128x128.png',
    'images/icons/icon-152x152.png',
    'images/icons/icon-192x192.png',
    'images/icons/icon-384x384.png',
    'images/icons/icon-512x512.png',
    'images/favicon.ico'
];

self.addEventListener('install', event =>
    event.waitUntil(
        caches
            .open(staticCacheName)
            .then(cache => cache.addAll(assets))
    )
);

self.addEventListener('activate', event =>
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                    .map(key => caches.delete(key))
            )
        )
    )
);

self.addEventListener('fetch', event =>
    event.respondWith(
        caches
            .match(event.request, { ignoreVary: true })
            .then(cacheRes =>
                cacheRes ||
                fetch(event.request)
                    .then(fetchRes =>
                        caches.open(dynamicCacheName)
                            .then(cache => {
                                cache.put(event.request.url, fetchRes.clone());
                                limitCacheSize(dynamicCacheName, 15);
                                return fetchRes;
                            })
                    )
            )
            .catch(event => {
                if (event.request.url.indexOf('.html') > -1) {
                    return caches.match('./offline.html');
                }
            })
    )
);

self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});