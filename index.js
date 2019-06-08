var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (req, rep) {
    setTimeout(function () {
        rep.setHeader('content-Type','text/html; charset=utf-8');
        rep.writeHeader(200,'success');

        var pathObj = url.parse(req.url,true);

        switch (pathObj.pathname) {
            case '/getProduct':
                var ret;
                if (pathObj.query.product === 'cup') {
                    ret = {
                        product : 'cup',
                        price : '5元'
                    }
                } else {
                    ret = {
                        product : pathObj.query.product,
                        price : 'unknown'
                    }
                }
                rep.end(JSON.stringify(ret));
                break;
            case '/user/123' :
                rep.write('<!doctype html><head></head><body><h1>readme的内容</h1></body></html>');
                rep.end(fs.readFileSync(__dirname + '/README.md'));
                break;
            default :
                rep.end(fs.readFileSync(__dirname + '/sample'+'/test.html'));
        }
    },2000);
});
console.log('open.http://localhost:8080');
server.listen(8080);