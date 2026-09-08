// sw.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', (event) => {
  // O AION recebe ordens mesmo offline
  const data = event.data ? event.data.json() : { title: 'AION', body: 'Mineração em curso...' };
  self.registration.showNotification(data.title, { body: data.body });
});

// Mineração em segundo plano
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'background-mining') {
    event.waitUntil(simulateMining());
  }
});

async function simulateMining() {
  // Lógica de mineração real aqui
  console.log("AION: Colheita de recursos realizada.");
}
