import { Center, Flex, Wrap, WrapItem } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react";
import { getAllProducts } from "../../api/card";
import GlobalContext from "../../context/GloablContext";
import ProductCard from "./ProductCard"

interface Props {
    toast: any;
    data:[];
    getAllProductHandler:Function;
}
function Cards(props:Props) {
    
    return (
       
        <Wrap spacing='40px' justify='center' marginTop='30px'>
            {props.data.map((card,index)=>(
                <WrapItem key={index}>
                <Center >
                    <ProductCard getAllProductHandler={props.getAllProductHandler} toast={props.toast} card={card} />
                </Center>
            </WrapItem>
            ))}
        </Wrap>
        
    )
}

export default Cards