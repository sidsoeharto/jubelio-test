const {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductsFromElevenia 
} = require('../controllers/product') 
const Joi = require('@hapi/joi')


module.exports = [
  {
    method: 'GET',
    path: '/get/product',
    handler: getProducts
  },
  {
    method: 'GET',
    path: '/get/product/{id}',
    handler: getProductById
  },
  {
    method: 'PUT',
    path: '/update/product/{id}',
    handler: updateProduct
  },
  {
    method: 'delete',
    path: '/delete/product/{id}',
    handler: deleteProduct
  },
  {
    method: 'GET',
    path: '/fetch-product',
    handler: getProductsFromElevenia
  },
  {
    method: 'POST',
    path: '/add/product',
    handler: addProduct,
    // options: {
    //   payload: {
    //     name: Joi.string().required(),
    //     sku: Joi.string().required(),
    //     image: Joi.string().required(),
    //     description: Joi.string().required(),
    //     price: Joi.number().required()        
    //   }
    // }
  }
]
