import React, { useState, useEffect } from 'react';
import { Text, Box, Button, VStack, Heading } from 'native-base';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setInfo(data);
    const obj=JSON.parse(data);
    console.log(obj.item1);
    console.log(obj.item2);
    console.log(obj.item3);
    setItem1(obj.item1)
    setItem2(obj.item2)
    setItem3(obj.item3)
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
<Text fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4}  >
  {item1}
</Text>
<Text fontSize={18} w="full" rounded={5} pl={5} bg="white" py={4} >
{item2}
</Text>
<Text fontSize={18} w="full" rounded={5} pl={5} bg="white" color="green.700" py={4} >
{item3}
</Text>
</VStack>
    </Box>
  );
}


