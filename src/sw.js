// Temporary way of bringing in Workbox
importScripts('workbox-sw.prod.js')

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: false
});

self.addEventListener('activate', function(event) {
  console.log('sw activated', event);
});

workbox.precache([]);