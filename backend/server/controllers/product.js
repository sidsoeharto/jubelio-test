const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const ApiResponse = require('../utils/response');

const db = require('../database')

const parser = new XMLParser();

module.exports = {
  getProductsFromElevenia: async (request, h) => {
    // const response = await fetch('https://api.elevenia.co.id', {
    //   headers: {
    //     'Content-Type': 'application/xml',
    //     "Accept-Charset": "utf-8",
    //     "openapikey": "721407f393e84a28593374cc2b347a98"
    //   }
    // });
    // const data = await response;
    const { elevenia } = request.server.plugins['hapi-axios'];
    const { parseString } = request.server.plugins['hapi-xml2js'];
    // const fetchData = await axios({
    //   method:'get',
    //   url: 'https://api.elevenia.co.id/rest/prodservices/product/listing?page=1',
      
    // })
    const { data } = await elevenia.get('/rest/prodservices/product/listing?page=1');

    let JsonData = ""
    parseString(data, function (err, result) {
        JsonData = result;
    });

    // .then(function (response) {
    //     return response;
    // })
    // .catch(function (error) {
    //     throw (error);
    // });

    return ApiResponse.ok(200, 'Berhasil Mengambil Data' ,JsonData);
  },
  getProducts: async (request, h) => {
    try {
      const data = await db.any('SELECT * FROM products');

      return ApiResponse.ok('Get all Product success', data)
    } catch (err) {
      return ApiResponse.internalServerError(err, 'Internal server error', err.message)
    }
    
  },
  getProductById: async (request, h) => {

  },
  updateProduct: async (request, h) => {

  },
  deleteProduct: async(request, h) => {

  },
  addProduct: async (request, h) => {
    try {
      let payload = request.payload;
      // payload.image = 'dummy-product.jpg';

      console.log(payload, 'INI PAYLOAD');

      const data = await db.none('INSERT INTO products(name, sku, image, price, description) VALUES(${name}, ${sku}, ${image}, ${price}, ${description})', payload)

      return ApiResponse.created('Create Product success', data)
    } catch (err) {
      return ApiResponse.internalServerError(err, 'Internal server error', err.message)
    }
  }
}