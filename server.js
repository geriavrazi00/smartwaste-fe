const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const axios = require('axios');

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;

var proxy = require('http-proxy').createProxyServer({
    host: '/',
});

app.get('/sensor1', function(req, res, next) {
  return axios.get('https://prodadmin.sensoneo.com/odata/SensorDiagnostic?$top=1&$skip=0&$inlinecount=allpages&$expand=sensor, network_type, user&$filter=sensor_id eq 14043&$orderby=created_at desc')
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/sensor2', function(req, res, next) {
  return axios.get('https://prodadmin.sensoneo.com/odata/SensorDiagnostic?$top=1&$skip=0&$inlinecount=allpages&$expand=sensor, network_type, user&$filter=sensor_id eq 13902&$orderby=created_at desc')
  .then(response => {
    res.send(response.data)
  })
  .catch(error => {
    console.log(error);
  });
});


app.listen(port, function() {
    console.log('Listening!');
});
