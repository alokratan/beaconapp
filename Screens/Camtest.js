import QRCode from 'react-native-qrcode-svg'
import { Box, Button, Input, Modal, Text } from 'native-base'
import React,{useState} from 'react'

const Camtest = () => {
    const [qrdata,setQrdata]=useState("");
    const [generated,setGenerated]=useState(false);

// const av='{"item1":"item_392","item2":"item_393","item3":"Assigned To Supp on 4/5/2001"}'
   




const abcd=(item)=>{
        setQrdata(item);
        console.log(item)
    }


    
    const abcd2=()=>{
      qrdata===""?
    setGenerated(false):
    setGenerated(true);
    
    }
  return (
    <Box mt={5} px={5} flex={1} w="full" alignItems="center">
        <Input shadow={2} 
        onChangeText={abcd}
        value={qrdata}
        _light={{
    bg: "coolGray.100",
    _hover: {
      bg: "coolGray.200"
    },
    _focus: {
      bg: "coolGray.200:alpha.70"
    }
  }} placeholder="Type Anything....." />
        <Button
        onPress={abcd2}
        py={2}
        px={6}
        my={5}
        _pressed={
            {
                bg:'red.200'
            }
        }
        >
<Text color="white">Hello</Text>
        </Button>
 
  <Modal isOpen={generated} onClose={() => setGenerated(false)} >
    <Box bg="#0001" justifyContent="center" alignItems="center" shadow={5} w="auto" h="auto">
    <QRCode
    size={260}
    value= {qrdata}
  />
    </Box>
  
  </Modal>


    </Box>
  )
}

export default Camtest
