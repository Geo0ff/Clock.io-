const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); 

// Sset static path 
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey = 'BPVfRU--P7p-SoHa7mXe02VMHZkJzuIuGxPBF7A2uZ9shBFhA4gjy8fFZ2j-5RGzTrzMxGNmlHdUqi8FL_jXmW8';
const privateVapidKey = 'Yjt5jd7yv6biTi64zWhIF-zyIzpI6kJfBhBoNmPGEi4';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe Route 
app.post('/Subscribe',(req,res) => { 
//Get pushSubscription object
const subscription = req.body;

//Send 201 - resource created 
res.status(201).json({});
//Create payload 

const payload =  JSON.stringify({ title:'Hello from Clock.io'});

//Pass object into  sendNotification 
webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));