const CACHE_NAME = 'grimorio-ancestrais-v5';
const MUSIC_CACHE = 'grimorio-musicas-offline-v2';
const CORE = ['./', './index.html', './styles.css', './app.js', './music-player.js', './manifest.webmanifest', './assets/capa-grimorio.png', './assets/icon.svg'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('grimorio-ancestrais-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 if (event.request.method !== 'GET') return;
 const url = new URL(event.request.url);
 if (url.origin === self.location.origin && url.pathname.includes('/assets/music/')) {
  event.respondWith((async()=>{
   const cache=await caches.open(MUSIC_CACHE);
   const cached=await cache.match(url.href);
   const range=event.request.headers.get('range');
   if(cached){
    if(!range)return cached;
    const bytes=await cached.arrayBuffer();const match=/bytes=(\d*)-(\d*)/.exec(range);
    if(match){const start=match[1]?Number(match[1]):0;const end=match[2]?Math.min(Number(match[2]),bytes.byteLength-1):bytes.byteLength-1;if(start<=end&&start<bytes.byteLength)return new Response(bytes.slice(start,end+1),{status:206,headers:{'Content-Type':cached.headers.get('Content-Type')||'audio/mpeg','Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${bytes.byteLength}`,'Content-Length':String(end-start+1)}})}
   }
   return fetch(event.request);
  })());return;
 }
 event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => { if (response && response.ok && url.origin === self.location.origin) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); } return response; }).catch(() => caches.match('./index.html'))));
});
