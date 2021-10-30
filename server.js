// const express = require('express');
// const serveStatic = require("serve-static")
// const path = require('path');
// app = express();
// app.use(serveStatic(path.join(__dirname, 'dist')));
// const port = process.env.PORT || 3000;
// app.listen(port);

// const express = require('express');
// const morgan = require("morgan");
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // Create Express Server
// const app = express();

// // Configuration
// const PORT = 3000;
// const HOST = "localhost";
// const API_SERVICE_URL = "https://prodadmin.sensoneo.com";

// // Logging
// app.use(morgan('dev'));

// // Info GET endpoint
// app.get('/odata/SensorDiagnostic', (req, res, next) => {
//   res.send('This is a proxy service which proxies to Billing and Account APIs.');
// });

// // Proxy endpoints
// app.use('/odata/SensorDiagnostic', createProxyMiddleware({
//   target: API_SERVICE_URL,
//   changeOrigin: true,
//   pathRewrite: {
//       [`^/odata/SensorDiagnostic`]: '',
//   },
// }));

// // Start the Proxy
// app.listen(PORT, HOST, () => {
//   console.log(`Starting Proxy at ${HOST}:${PORT}`);
// });



// const express = require('express');
// const path = require('path');
// const history = require('connect-history-api-fallback');

// const app = express();

// const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

// app.use(staticFileMiddleware);
// app.use(history({
//   disableDotRule: true,
//   verbose: true
// }));
// app.use(staticFileMiddleware);

// app.get('/', function (req, res) {
//   res.render(path.join(__dirname + '/dist/index.html'));
// });

// var server = app.listen(process.env.PORT || 8080, function () {
//   var port = server.address().port;
//   console.log("App now running on port", port);
// });


const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const axios = require('axios');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
// app.listen(port);

var proxy = require('http-proxy').createProxyServer({
    host: '/',
    // port: 80
});

app.get('/sensor1', function(req, res, next) {
  // res.send(events);
  return axios.get('https://prodadmin.sensoneo.com/odata/SensorDiagnostic?$top=1&$skip=0&$inlinecount=allpages&$expand=sensor, network_type, user&$filter=sensor_id eq 14043&$orderby=created_at desc')
  .then(response => {
    console.log(response.data);
    res.send(response.data)
  })
  .catch(error => {
    console.log(error);
  });
});

app.listen(port, function() {
    console.log('Listening!');
});
