importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');


self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.loadModule('workbox-strategies');
workbox.loadModule('workbox-expiration');

const workboxChannel = new BroadcastChannel('workbox')

const backgroundSyncOptions = {
    maxRetentionTime: 1, // 请求有效时长
    async onSync({ queue }) {
        try {
            return await queue.replayRequests();
        } catch (error) {
            throw error;
        } finally {
            workboxChannel.postMessage({
                type: 'BACKGROUND_SYNC',
                meta: queue.name,
                payload: {
                    data: true
                }
            });
        }
    }
};
workbox.routing.registerRoute(
    /manifest.json/,
    new workbox.strategies.CacheFirst({
        cacheName: 'manifest-cache'
    }),
    'GET'
);
workbox.routing.registerRoute(
    new RegExp('/slider/list$'),
    new workbox.strategies.CacheFirst({
        cacheName: 'slider-cache'
    }),
    'GET'
);
workbox.routing.registerRoute(
    new RegExp('/sliders/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'sliders-cache'
    }),
    'GET'
);


workbox.routing.registerRoute(
    new RegExp('/products/'),
    new workbox.strategies.NetworkFirst({
        cacheName: 'products-expiration-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 day

            })
        ]
    }),
    'GET'
);

workbox.routing.registerRoute(
    /search/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'search-expiration-cache',
        plugins: [
            //new workbox.backgroundSync.Plugin('search', backgroundSyncOptions),//name唯一
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 day

            })
        ]
    }),
    'GET'
);
workbox.routing.registerRoute(
    /productsfavourite/,
    new workbox.strategies.NetworkFirst({
        cacheName: 'favourite-expiration-cache',
        plugins: [
            new workbox.backgroundSync.Plugin('favourite', backgroundSyncOptions),//name唯一
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 1 day

            })
        ]
    }),
    'GET'
);
