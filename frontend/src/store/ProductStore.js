import { makeObservable, observable, autorun, action, runInAction } from "mobx";
import { createContext } from 'react'
import API_URL from '../config/axios';
import axios from 'axios';

class ProductStore {
    constructor () {
        makeObservable(this, {
          product: observable,
          productDetail: observable,
          getProduct: action,
          getProductDetail: action,
          updateProduct: action,
          deleteProduct: action,
          createProduct: action,
          getProductFromElevenia: action,
          editDetailState: action,
        },
        runInAction(this.prefetchData));
    }
    
    product = [];
    productDetail = {
        id: null,
        name: '',
        sku: '',
        price: 0,
        image: '',
        description: '',
    };

    getProduct = async () => {
        const getData = await API_URL.get('/get/product')
        .then((response) => {
            // console.log(response.data)
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        })

        return this.product = getData.data
    }

    getProductDetail = async (param) => {
        const getData = await API_URL.get(`get/product/${param}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return console.log(err)
        })

        this.productDetail = getData.data[0];
        return getData.data;
    }

    editDetailState = (name, value) => {
        let dataObj = this.productDetail;
        dataObj[name] = value;

        return this.productDetail = dataObj;
    }

    createProduct = async (payload) => {
        const getData = await API_URL.post('add/product', payload)
        .then((response) => {
            // console.log(response);
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        });

        return window.location.reload();
    }

    deleteProduct = async (param) => {
        const getData = await API_URL.delete(`delete/product/${param}`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        });

        return window.location.reload();
    }

    updateProduct = async (param, payload) => {
        const getData = await API_URL.put(`update/product/${param}`, payload)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return console.log(err)
        })

        return window.location.reload();
    }

    getProductFromElevenia = async () => {
        const action = await API_URL.get(`fetch-product`)
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        });

        return window.location.reload();
    }

    prefetchData = async () => {
        const data = this.getProduct();

        return this.product = data;
    }
}

const store = createContext(new ProductStore());
export default store;