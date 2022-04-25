import { makeObservable, observable, autorun, action, runInAction } from "mobx";
import { createContext } from 'react'
import API_URL from '../config/axios';

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
        },
        runInAction(this.prefetchData));
    }
    
    product = [];
    productDetail = [];

    getProduct = async () => {
        const getData = await API_URL.get('/get/product')
        .then((response) => {
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        })

        return this.product = getData.data;
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

    createProduct = async (payload) => {
        const getData = await API_URL.post('add/product', payload)
        .then((response) => {
            console.log(response);
            return response.data
        })
        .catch((err) => {
            return console.log(err);
        });

        return this.product = getData.data;
    }

    deleteProduct = async (param, payload) => {
        const getData = await API_URL.post(`delete/product/${param}`, payload)

        return getData.data;
    }

    updateProduct = async (param, payload) => {
        const getData = await API_URL.post(`update/product/${param}`, payload)

        return getData.data;
    }

    getProductFromElevenia = async (param) => {
        const action = await API_URL.get(`fetch-product`)
        const getDataNew = await API_URL.get('/get/product')
        this.product = getDataNew.data.data

        return action.data
    }

    prefetchData = async () => {
        const data = this.getProduct();

        return this.product = data;
    }
}

const store = createContext(new ProductStore());
export default store;