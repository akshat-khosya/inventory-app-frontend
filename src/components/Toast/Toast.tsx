import { Button, useToast, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
interface prop {
    status: 'success' | 'error' | 'warning' | 'info';
    message: string
}
function Toast(props: prop) {
    const toast = useToast()

    return (
        <Wrap>
            <WrapItem>
                <Button
                    onClick={() => {
                        toast({
                            title: `${props.status} toast`,
                            status: props.status,
                            isClosable: true,
                        })
                    }}
                >
                    {props.message}
                </Button>
            </WrapItem>
        </Wrap>
    )
}

export default Toast