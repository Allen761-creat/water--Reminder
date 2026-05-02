// self.addEventListener('install', () => {
//   self.skipWaiting();
// });

// self.addEventListener('activate', () => {
//   clients.claim();
// });

// // message receive
// self.addEventListener('message', event => {
//   if (event.data === 'show-notification') {
//     self.registration.showNotification('💧 Drink Water', {
//       body: 'Time to hydrate!',
//       icon: '/icon.png',
//       requireInteraction: true, // 👈 important (NOT auto close)
//       actions: [
//         { action: 'drink', title: 'Drank 💧' },
//         { action: 'skip', title: 'Skip ⏭' }
//       ]
//     });
//   }
// });

// // button click handling
// self.addEventListener('notificationclick', event => {
//   event.notification.close();

//   event.waitUntil(
//     (async () => {
//       const allClients = await clients.matchAll({
//         type: 'window',
//         includeUncontrolled: true
//       });

//       let client = allClients[0];

//       if (client) {
//         client.focus();
//         client.postMessage({
//           action: event.action
//         });
//       } else {
//         clients.openWindow('/');
//       }
//     })()
//   );
// });

// --------------------------------------------------------------


// ── INSTALL ──
// self.addEventListener('install', (event) => {
//   self.skipWaiting();
// });

// // ── ACTIVATE ──
// self.addEventListener('activate', (event) => {
//   event.waitUntil(self.clients.claim());
// });


self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});

// ── RECEIVE MESSAGE FROM APP ──
self.addEventListener('message', (event) => {
  if (event.data === 'show-notification') {
    self.registration.showNotification('💧 Drink Water', {
      body: 'Time to hydrate!',
      icon: '/icon.png',
      badge: '/icon.png',
      requireInteraction: true, // stays until user interacts
      actions: [
        { action: 'drink', title: 'Drank 💧' },
        { action: 'skip', title: 'Skip ⏭' }
      ],
      data: {
        url: '/' // optional: where to open
      }
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      });

      // sirf existing tab use karo (agar ho)
      let client = allClients.find(c => 'focus' in c);

      if (client) {
        // ❌ focus bhi optional hai — remove if you want totally silent
        // await client.focus();

        client.postMessage({
          action: event.action || 'default'
        });
      }

      // ❌ IMPORTANT: new tab open NAHI karni
      // clients.openWindow('/') ❌ remove kar diya
    })()
  );
});




