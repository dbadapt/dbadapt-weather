// This is required to get around the CORS failures 
// during development

const express = require('express');
const createProxyMiddleware = require('http-proxy-middleware');

const app = express();

module.exports = function(app) {
  app.use('/data', createProxyMiddleware({ target: 'https://api.openweathermap.org', changeOrigin: true }));
  app.listen(3000);
}
