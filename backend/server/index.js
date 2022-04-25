const hapi = require('@hapi/hapi')
const config = require('./config')
const Axios = require('./plugins/axios');
const ParseXML = require('./plugins/xml2js');

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    host: '127.0.0.1',
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
  })

  // Register the plugins
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/log-errors'))
  await server.register(require('./plugins/logging'))
  await server.register(require('blipp'))
  await Axios(server);
  await ParseXML(server);

  // await server.register({
  //   plugin: XMLParser,
  //   // options: {
  //   //   instances: [{
  //   //     name: 'parseXML',
  //   //   }]
  //   // }
  // })

  return server
}

module.exports = createServer
