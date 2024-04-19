/**
 * Insert this Errsole code snippet as the first line of your app's main file
 */
const errsole = require('errsole');
const ErrsoleMongoDB = require('errsole-mongodb');

errsole.initialize({
  storage: new ErrsoleMongoDB('mongodb+srv://rishi:VbkSqGMCibWa3hMG@errsole-oc.qtfpw0d.mongodb.net/?retryWrites=true&w=majority')
});
// End of Errsole code snippet

/**
 * Your app code starts here
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware((pathname, req) => {
  return pathname.match('^/api') && !pathname.match('\.(js|css|png|jpg|jpeg|gif|ico)$');
}, {
    target: 'http://localhost:8001', 
    changeOrigin: true,             
    pathRewrite: {
        '^/api': '',
    },
    onProxyReq: (proxyReq, req, res) => {
        // You can modify the proxy request here (e.g., headers)
    }
}));

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/random', function (req, res) {
  console.log(req);
  setInterval(function () {
    const time = Math.floor(Math.random() * (4000 - 700 + 1) + 1300);
    console.log(generateRandomLine(5) + ' ' + time);
  }, 100);
  res.send('pong');
});

function generateRandomLine (wordCount) {
  const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla', 'watermelon', 'xigua', 'yam', 'zucchini'];
  let sentence = '';

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    sentence += words[randomIndex] + ' ';
  }

  return sentence.trim();
}

app.listen(3000);
