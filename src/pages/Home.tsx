
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../components/Card/ProductCard';
import Cards from '../components/Card/Cards';
import Threedot from '../components/Bottom/Threedot';
import { useDisclosure, useToast } from '@chakra-ui/react';
import Login from '../components/Bottom/Login';
import Toast from '../components/Toast/Toast';
import GlobalContext from '../context/GloablContext';
import NewProduct from '../components/Bottom/NewProduct';
import { getAllProducts } from '../api/card';

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let newProduct = useDisclosure();
    const {autoLoginHandler,axiosInstance} = useContext(GlobalContext);
    const toast = useToast()
    let [cards,setCards]= useState<any>([]);
    const getAllProductHandler = async ()=>{
        try {
            let res = await getAllProducts(axiosInstance);
            console.log(res);
            setCards(()=> res.prodcuts);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        autoLoginHandler();
        getAllProductHandler()
    })
    return (
        <>
            <Cards  data={cards} getAllProductHandler={getAllProductHandler} toast={toast} />
            <Threedot newProduct={newProduct} open={onOpen} />
            <Login toast={toast} isOpen={isOpen} onClose={onClose} />
            <NewProduct getData={getAllProductHandler} toast={toast} isOpen={newProduct.isOpen} onClose={newProduct.onClose} />
        </>

    )
}

export default Home