console.log('Service Worker Loaded');

self.addEventListener('push', e => {
   const data = e.data.json(); 
   console.log('Push Received...');
   self.registration.showNotification(data.title, {
       body: 'Hello from Clock.io',
       icon: 'https://cdn1.iconfinder.com/data/icons/youtuber/256/bell-notifications-notice-notify-alert-256.png'
   });
});