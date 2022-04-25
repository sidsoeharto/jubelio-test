const ApiResponse = require('../utils/response');
var http = require('http');

const db = require('../database')

module.exports = {
  getProductsFromElevenia: async (request, h) => {
    const { parseString } = request.server.plugins['hapi-xml2js'];

    function httprequest (page)  {
      return new Promise((resolve, reject) => {
        const req = http.get('http://api.elevenia.co.id/rest/prodservices/product/listing?page=' + page, {
          headers: {
            "Content-Type": "application/xml",
            "Accept-Charset": "utf-8",
            "openapikey": "721407f393e84a28593374cc2b347a98"
          },
        }, function(res) {
          
          var xml = '';
          res.on('data', function(chunk) {
            xml += chunk;
          });
        
          res.on('end', function() {
            parseString(xml, function (err, result) {
              resolve(result);
            });
          });
        });
        
        req.on('error', function(err) {
          reject(err);
        });

        req.end()
      })
    }

    let arr = [];
    let flagNotFound = false;
    let i = 1;

    while(!flagNotFound) {
      const JsonData = await httprequest(i).then((res) => res);

      if (JsonData.Products) {
        JsonData.Products.product.forEach((el, idx) => {
          let obj = {
            name: el.prdNm[0],
            sku: el.sellerPrdCd[0],
            image: el.prdImage01 ? el.prdImage01[0] : 'http://localhost:3000/assets/dummy-product.jpg',
            description: el.htmlDetail ? el.htmlDetail[0] : '',
            price: el.selPrc[0],
          }
          
          arr.push(obj);

          return db.none('INSERT INTO products(name, sku, image, description, price) VALUES(${name}, ${sku}, ${image}, ${description}, ${price}) ON CONFLICT DO NOTHING', obj);
        })
      } else {
        flagNotFound = true;
        break;
      }

      i++;
    }

    return ApiResponse.ok('Berhasil Mengambil Data', arr);
  },

  getProducts: async (request, h) => {
    try {
      const data = await db.any("SELECT * FROM products ORDER BY updated_at desc");

      return ApiResponse.ok('Get all Product success', data)
    } catch (err) {
      return ApiResponse.internalServerError(err.message, err)
    }
    
  },
  getProductById: async (request, h) => {
    try {
      console.log('ini id =>', request.params.id);
      const id = request.params.id;
      const data = await db.any('SELECT * FROM products WHERE id = ${id}', {
        id
      });

      return ApiResponse.ok('Get Product by ID success', data)
    } catch (err) {
      return ApiResponse.internalServerError(err.message, err)
    }
  },
  updateProduct: async (request, h) => {
    try {
      const id = request.params.id;
      const payload = request.payload;
      const data = await db.any('UPDATE products SET name = ${name}, sku = ${sku}, image = ${image}, price = ${price}, description = ${description} WHERE id = ${id}', {
        id: id,
        name: payload.name,
        sku: payload.sku,
        image: payload.image,
        price: payload.price,
        description: payload.description
      });
      return ApiResponse.ok('Update Product success', data)
    } catch (err) {
      return ApiResponse.internalServerError(err.message, err)
    }
  },
  deleteProduct: async(request, h) => {
    try {
      const id = request.params.id;

      const data = await db.any('DELETE FROM products WHERE id = ${id}', {
        id: id,
      });

      if (data == null) {
        const result = await db.any('SELECT * FROM products');
        return ApiResponse.ok('Delete Product success', result)
      }
    } catch (err) {
      return ApiResponse.internalServerError(err.message, err)
    }
  },
  addProduct: async (request, h) => {
    try {
      let payload = request.payload;

      console.log(payload, 'INI PAYLOAD');

      const data = await db.none('INSERT INTO products(name, sku, image, price, description) VALUES(${name}, ${sku}, ${image}, ${price}, ${description})', payload)

      if (data == null) {
        const result = await db.any('SELECT * FROM products');
        return ApiResponse.created('Create Product success', result)
      }

    } catch (err) {
      return ApiResponse.internalServerError(err.message, err)
    }
  }
}