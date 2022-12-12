import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Spinner, Stack, Textarea } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { requestOtp, verifyOtp } from '../../api/login';
import GlobalContext from '../../context/GloablContext';
interface prop {
  isOpen: boolean;
  onClose: () => void;
  toast: any
}

function Login(props: prop) {
  const { axiosInstance,setUser,setUserData } = useContext(GlobalContext);
  let [phone, setPhone] = useState<string>('');
  let [otp,setOtp] = useState<string>('');
  let [loading,setLoading] = useState<boolean>(false);
  let [loading1,setLoading1] = useState<boolean>(false);
  let [sent,setSent] = useState<boolean>(false);
  const requestOtpHandler = async () => {
    setLoading(true);
    try {
      let res = await requestOtp(phone, axiosInstance);
      console.log(res);
      props.toast(
        {
          title: res.message,
          status: "success",
          isClosable: true
        }
      );
      setSent(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      props.toast(
        {
          title: (error as Error).message,
          status: "error",
          isClosable: true
        }
      )
      setLoading(false);
    }
  }
  const loginHandler = async () => {
    setLoading1(true);
    try {
      const res = await verifyOtp(phone,parseInt(otp),axiosInstance);
      console.log(res);
      props.toast(
        {
          title: res.message,
          status: "success",
          isClosable: true
        }
      )
      setUser(true);
      setUserData(phone);
      localStorage.setItem("token",res.token);
      setLoading1(false);

      props.onClose();
      setPhone("");
      setOtp("");
      setSent(false);
    } catch (error) {
      console.log(error);
      props.toast(
        {
          title: (error as Error).message,
          status: "error",
          isClosable: true
        }
      )
      setLoading1(false);
    }
  }

 
  return (
    <Drawer
      isOpen={props.isOpen}
      placement='left'
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>
          Login
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing='24px'>
            <Box>
              <FormLabel htmlFor='phonenumber'>Phone Number</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id='phonenumber'
                placeholder='Please enter phone number'
              />
            </Box>
            <Box>
              <Button onClick={requestOtpHandler} colorScheme='blue' variant='outline'>{loading?<Spinner />:sent?"Resend Otp":"Send Otp"}</Button>
            </Box>
            {sent && 
            <Box>
            <FormLabel htmlFor='otp'>Enter Otp</FormLabel>
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              id='otp'
              placeholder='Please enter otp'
            />
          </Box>
            }
            
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={props.onClose}>
            Cancel
          </Button>
          {sent &&  <Button onClick={loginHandler} colorScheme='blue'>{loading1?<Spinner />:"Login"}</Button> }
         
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default Login