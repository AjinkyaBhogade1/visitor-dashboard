// import React from 'react';
import axios from 'axios'
const baseUrl="http://10.9.43.243:3030/visitor/"

 class DocumentService {

    static postApi(url,data){
        return axios.post(baseUrl + url, data);   
    }

    static getApi(url){
        return axios.get(baseUrl + url);   
    }

    static deleteApi(url){
        return axios.delete(baseUrl + url);   
    }
}

export default DocumentService
