import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import { AddIcon, ArrowUpIcon, SettingsIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import GlobalContext from '../../context/GloablContext';
interface prop{
    open:()=>void;
    newProduct:any;
}
function Threedot(props:prop) {
    const {user,userData,setUser,setUserData} = useContext(GlobalContext);
    const logout = async()=>{
        localStorage.removeItem("token");
        setUser(false);
        setUserData("");
      }
    return (
        <Box
            position='fixed'
            top='20px'
            right={['0px', '20px']}
            zIndex={3}>
           
            <Menu>
                <MenuButton >
                    {
                        user?<Avatar src='https://bit.ly/broken-link' />:
                        <SettingsIcon fontSize="4xl" cursor="pointer" />
                    }
                
                </MenuButton>
                <MenuList>
                    <MenuGroup title={user?userData:"SignIn"}>
                        <MenuItem onClick={user?logout:props.open}>{user?'Logout':'Login'}</MenuItem>
                        {user && <MenuItem onClick={props.newProduct.onOpen}>Add Product </MenuItem>  }
                        
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Box>
    )
}

export default Threedot