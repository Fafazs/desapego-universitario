const CACHE_NAME = 'desapego-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instala o Service Worker e salva os arquivos estáticos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepta as requisições com filtro correto para a API
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 🛑 IG NORA chamadas da API (Render, /ads, /auth, /api) e métodos POST/PUT/DELETE
  if (
    event.request.method !== 'GET' || 
    url.includes('onrender.com') || 
    url.includes('/ads') || 
    url.includes('/auth') ||
    url.includes('/api')
  ) {
    return; // O navegador faz a requisição HTTP normal diretamente para a internet
  }

  // Tenta servir do cache local apenas arquivos estáticos (HTML, CSS, JS)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});