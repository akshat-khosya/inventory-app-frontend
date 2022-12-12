import React, { useContext, useState } from 'react'
import { Card, CardBody, CardFooter, ButtonGroup, Stack, Heading, Text, Image, Divider, Button, Spinner } from '@chakra-ui/react'
import GlobalContext from '../../context/GloablContext'
import { deleteProduct } from '../../api/card';
function ProductCard(props: any) {
  const { user,axiosInstance } = useContext(GlobalContext);
  let [loading,setLoading]= useState(false);
  console.log();
  const deleteCardHandler = async()=>{
    setLoading(true);
    try {
      let res = await deleteProduct(props.card.productId,axiosInstance);
      props.toast({
        title: "Card Deleted",
        description: "Your card has been deleted",
        status: "success",
        isClosable: true
      })
      console.log(res);
      setLoading(false);
      props.getAllProductHandler();
    } catch (error) {
      console.log(error);
      props.toast({
        title: "Card Not Deleted",
        description: (error as Error).message,
        status: "error",
        isClosable: true
      })
      setLoading(false);
    }
  }
  return (
    <Card maxW='sm'>
      <CardBody>
        <Image
          src={props.card.url === null ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' : props.card.url}
          alt={props.card.name}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{props.card.name}</Heading>
          <Text>
            {props.card.description}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      {user &&
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button onClick={deleteCardHandler} variant='solid' colorScheme='red'>
              {loading?<Spinner />:"Delete Card"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      }

    </Card>
  )
}

export default ProductCard