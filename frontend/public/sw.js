const CACHE_NAME = 'desapego-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Instala o Service Worker e salva os arquivos estáticos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições (se estiver sem internet, tenta pegar do cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se encontrar, senão faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});

// Dentro do seu sw.js:
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // 🛑 IGNOORA requisições para a API do Render ou métodos que não sejam GET (POST/PUT/DELETE)
  if (event.request.method !== 'GET' || url.includes('onrender.com') || url.includes('/ads') || url.includes('/auth')) {
    return; // Deixa o navegador fazer a requisição HTTP normal sem passar pelo Service Worker
  }

  // ... (o restante da sua lógica de cache do PWA continua aqui abaixo)
});