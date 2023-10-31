var express = require('express'), http = require('http');
// var cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { dirname } = require('path');
var static = require('serve-static');
var app = express();

app.set('port', process.env.PORT || 8080);
app.set('host', '0.0.0.0'); // 로컬 개발 환경에서는 host 설정을 주석 처리 또는 제거

app.use(static(__dirname));

// Define the proxy route and target
const naverMapsProxy = createProxyMiddleware('/naver-maps-api', {
    target: 'https://naveropenapi.apigw.ntruss.com',
    changeOrigin: true, // This ensures that the "Host" header is properly set
    pathRewrite: {
      '^/naver-maps-api': '', // Remove the "/naver-maps-api" path prefix
    },
  });

// Use the proxy middleware
app.use(naverMapsProxy);

app.get('/', function(요청, 응답){
  응답.sendFile(dirname + '/index.html');
});

http.createServer(app).listen(app.get('port'), app.get('host'), () => {
    console.log('Express server running at ' + app.get('port') + ' ' + app.get('host'));
});
