const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Прокси для первого API
  app.use(
    '/exchangerate-api', // Путь, который будет проксироваться
    createProxyMiddleware({
      target: 'https://v6.exchangerate-api.com/', // Целевой сервер API
      changeOrigin: true, // Изменяет заголовок Origin в запросе
      pathRewrite: {
        '^/api1': '', // Удаляет `/api1` из пути запроса
      },
    })
  );

  // Прокси для второго API
  app.use(
    '/privatbank-api', // Путь, который будет проксироваться
    createProxyMiddleware({
      target: 'https://api.privatbank.ua/', // Целевой сервер API
      changeOrigin: true, // Изменяет заголовок Origin в запросе
      pathRewrite: {
        '^/api2': '', // Удаляет `/api2` из пути запроса
      },
    })
  );
};