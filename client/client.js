const publicVapidKey = 
'BPVfRU--P7p-SoHa7mXe02VMHZkJzuIuGxPBF7A2uZ9shBFhA4gjy8fFZ2j-5RGzTrzMxGNmlHdUqi8FL_jXmW8';

//Check for service worker 
if('serviceWorker' in navigator) { 
    send().catch(err => console.error(err));
}

//Register SW, Register Push, Send Push 
async function send() { 
    //Register Service Worker 
    console.log ('Registering service worker ...');
    const register = await navigator.serviceWorker.register('/worker.js', { 
        scope: '/'
    });
console.log('Service Worker Registered...');

// Register push 
console.log('Registering Push...');
const subscription = await register.pushManager.subscribe({
    userVisibleOnly:true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
});

console.log('Push Registered...');

//send push Notification 
console.log('Sending Push...');
await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 
        'content-type': 'application.json'
        
    }
});
console.log('Push Sent...');

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }