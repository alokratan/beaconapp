
import { Box, Button,HStack,ToastAndroid, Heading, Input, Radio, Text } from 'native-base'
import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Dispatchdata = () => {
    const [value,setValue]=useState("P");
    const [P_DISPATCH_FLAG,setP_DISPATCH_FLAG]=useState("P");
    const [itemcode,setItemcode]=useState("");

    const abcdfun=(e)=>{
        setItemcode(e);
        console.log(e);
        
    }
    
    const onputdata=async()=>{
        
     
          try {
            console.log("heelo",itemcode)
            console.log("heelo",P_DISPATCH_FLAG)
            const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/DATA/${itemcode}`,
             {     P_DISPATCH_FLAG
             });
            console.log("heading5",response.data);
       
   
          } catch (error) {
            console.error("heading4",error); // Handle the error
          }
        }

  return (
    <Box w="full" alignItems="center" justifyContent="space-evenly" bg="blue.200" h={300}>
        
        <Heading fontSize={20}>
            ITEM DISPATCH OR NOT
        </Heading>
        <Input placeholder='Enter Item Code' onChangeText={abcdfun}    fontSize={18} w={200} bg="white" />

        <Radio.Group
        value={value}
        onChange={(a)=>{
            setValue(a);
            setP_DISPATCH_FLAG(a);
        }}
        >
            <HStack space={10}>
            <Radio value='P' my="1">
                NO
            </Radio>
            <Radio value='D' my="1">
              YES
            </Radio>
            </HStack>
          
        </Radio.Group>
        <Button onPress={onputdata} >

            <Text color="white" >Submit</Text>
        </Button>
    
    </Box>
  )
}

export default Dispatchdata

