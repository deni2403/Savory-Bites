import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import CONFIG from './globals/config';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin + CONFIG.BASE_URL,
  new StaleWhileRevalidate(),
);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', () => {
  console.log('Service Worker: Pushed');
});
