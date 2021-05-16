import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_URL_API
});

api.interceptors.request.use((config) => {
  config.headers.Authorization =  process.env.REACT_APP_AUTHENTICATION_GIT_HUB
  return config;
});

const getByUser = async (cpf) => {
    return api.get(`cliente/cpf/${cpf}`);
}

const getWishListByUser = async (idCliente) => {
    return api.get(`wishList/cliente/${idCliente}`);
}

const getAllProdutos = async () => {
    return api.get(`produto`);
}

const setWishList = async (idCliente, idProdutos) => {
    return api.post(`wishList/${idCliente}`, idProdutos)
}

export {
    getByUser,
    getWishListByUser,
    getAllProdutos,
    setWishList
}