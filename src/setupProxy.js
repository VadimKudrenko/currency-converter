const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/exchangerate-api',
    createProxyMiddleware({
      target: 'https://v6.exchangerate-api.com/',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '', 
      },
    })
  );

  app.use(
    '/privatbank-api', 
    createProxyMiddleware({
      target: 'https://api.privatbank.ua/', 
      changeOrigin: true, 
      pathRewrite: {
        '^/api2': '',
      },
    })
  );
};