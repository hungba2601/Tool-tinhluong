// Dummy Service Worker
// Mục đích: Bypass cơ chế cài đặt PWA của Android Chrome mà không lưu cache gây lỗi
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Xóa tất cả các cache cũ nếu có
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    // Luôn luôn lấy từ mạng, tuyệt đối không dùng cache
    event.respondWith(fetch(event.request));
});
