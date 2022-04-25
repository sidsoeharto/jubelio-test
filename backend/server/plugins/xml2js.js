const { parseString } = require("xml2js");

function register(server, options) {
    const instance = parseString;
    server.expose(options.name, instance);
}

const xml2js = {
    name: 'hapi-xml2js',
    register,
    version: '1.0.0',
};

module.exports = async (server) => (
  await server.register({
      plugin: xml2js,
      options: {
          name: 'parseString',
      },
  })
)