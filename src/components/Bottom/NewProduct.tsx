import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Spinner, Stack, Textarea } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { addProduct } from '../../api/card';
import GlobalContext from '../../context/GloablContext';
interface prop {
    isOpen: boolean;
    onClose: () => void;
    toast: any;
    getData:any;
}
interface dataO{
    name:string;
    description:string;
    url?:string;
}
export default function NewProduct(props: prop) {
    const {axiosInstance} = useContext(GlobalContext);
    let [name, setName] = useState<string>("");
    let [url, setUrl] = useState<string>("");
    let [description, setDesc] = useState<string>("");
    let [loading,setLoading] =useState<boolean>(false);
    const addNewProduct = async () => {
        setLoading(true);
        let data:dataO={
            name,
            description
        }
        if(url.length>0){
           data.url = url;
        }
        try {
            let res = await addProduct(data,axiosInstance);
            props.toast({
                title: "Product Added",
                description: "Product added successfully",
                status: "success",
                isCloseable: true,
            })
            setLoading(false);
            props.getData();
        } catch (error) {
            console.log(error);
            props.toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                isCloseable: true,
            })
            setLoading(false);
        }
    }
    return (
        <>

            <Drawer
                isOpen={props.isOpen}
                placement='left'
                onClose={props.onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Create a new Product
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Box>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    id='rname'
                                    placeholder='Please enter product name'
                                />
                            </Box>

                            <Box>
                                <FormLabel htmlFor='url'>Url</FormLabel>
                                <InputGroup>
                                    <Input
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        type='url'
                                        id='url'
                                        placeholder='Please enter Image url'
                                    />
                                </InputGroup>
                            </Box>

                            <Box>
                                <FormLabel htmlFor='desc'>Product Description</FormLabel>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDesc(e.target.value)}
                                    id='desc' />
                            </Box>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={props.onClose}>
                            Cancel
                        </Button>
                        <Button onClick={addNewProduct} colorScheme='blue'>{loading?<Spinner />:"Add"}</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
