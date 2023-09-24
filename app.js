var express = require('express'), http = require('http');
var cors = require('cors');
var static = require('serve-static');
var app = express();

app.set('port', process.env.PORT || 8080);
// app.set('host', '127.0.0.1'); // 로컬 개발 환경에서는 host 설정을 주석 처리 또는 제거


app.use(static(__dirname));
app.use(cors());

http.createServer(app).listen(app.get('port'),app.get('host'),()=>{
    console.log('Express server running at'+app.get('port')+app.get('host'));
});