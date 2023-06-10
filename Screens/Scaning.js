import React, { useState, useEffect } from 'react';
import { Text, Box, Button, VStack, Heading } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import axios from 'axios';
export default function Scaning() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [info, setInfo] = useState("");
const [item1,setItem1]=useState('');
const [item2,setItem2]=useState('');
const [item3,setItem3]=useState('');


  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const postData = async () => {
    try {
      const response = await axios.get('https://ourphonemd.com/ords/consultit/QRCODE/QRCODEDATA');
      console.log("heading4",response.data); // Handle the response data
    } catch (error) {
      console.error("heading4",error); // Handle the error
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(data)
    setInfo(data);
    // const obj=JSON.parse(data);
    // console.log(obj.item1);
    // console.log(obj.item2);
    // console.log(obj.item3);
    // setItem1(obj.item1)
    // setItem2(obj.item2)
    // setItem3(obj.item3)
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Box flex={1} justifyContent="center" alignItems="center"  >      
        <Box h={300} w="80%" >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}       
      />
      </Box>
      <Text my={5} color="blue.900" fontWeight={600} fontSize={20} >{info}</Text>


      {scanned && <Button py={4} px={10} onPress={() => setScanned(false)} >
      Tap to Scan Again
      </Button>
      }
<VStack w="full" mx={5} my={5}  space={5}>    
<Heading fontWeight={600} fontSize={20} >
  Item Details
</Heading>
<Button 
        _
         fontSize={16}
         
          onPress={postData} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
                  
            bg:"#0004",
          }} >

<Text fontWeight={500} color="white" fontSize={16} >
          SAVE
        </Text>
</Button>

</VStack>
    </Box>
  );
}


