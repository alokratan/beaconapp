
import { Box,Modal, HStack,Divider,ScrollView,Pressable, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React,{useState,useCallback} from 'react'
import Header from '../Header'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../../Components/Footer'
import itemdetails from '../../Itemdetails'
import { MaterialIcons } from '@expo/vector-icons';
const RecVender = ({navigation}) => {
  const [openqr,setOpenqr]=useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useFocusEffect(
    useCallback(
      ()=>{
       ( async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        
        } )(); 
      }
    )
  )
  const onscanbutton=()=>{
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    }
  function Modalcamfun(){
    onscanbutton();
    const handleBarCodeScanned = ({data }) => {
      setOpenqr(false);
     alert(data);
    // const obj=JSON.parse(data);
      // console.log(obj.item1);
      // console.log(obj.item2);
      // console.log(obj.item3); 
    };
    return(
      <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>       
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:260,height:260}}       
      />
       {scanned && <Button py={2} px={5} position='absolute' top='40%' onPress={() => setScanned(false)}>
      Tap to Scan Again
      </Button>
      }
        </Box>
    )
  } 
  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
       <Modal isOpen={openqr} onClose={()=>setOpenqr(false)} >
        <Modalcamfun/>
        </Modal>
    <Header goback={()=>navigation.goBack()} title="Received From Vendor"/>
   <ScrollView   nestedScrollEnabled>
    <Box flex={1} >   
    <VStack mx={5} my={10}  space={5}>
{/* <Heading fontWeight={600} fontSize={20} >
  Recieving
</Heading> */}
<HStack justifyContent="space-between" w="full" rounded={5} px={5} bg="white" py={4}>
<Text fontSize={18}>
  Scan Item QR
</Text>
<Pressable

_pressed={
  {
    bg:'grey'
  }
}
onPress={()=>setOpenqr(true)}>
<MaterialIcons  name="qr-code-scanner" size={24} color="black" />  
</Pressable>
</HStack>

<HStack justifyContent="space-between" w="full" rounded={5} px={5} bg="white" py={4}>
<Text fontSize={18}>
Scan Store Location
</Text>
<Pressable
_pressed={
  {
    bg:'grey'
  }
}
onPress={()=>alert("scan is not possible")}
>

<MaterialIcons  name="qr-code-scanner" size={24} color="black" />  
</Pressable>
</HStack>

</VStack>
<VStack mx={5} my={5}  space={5}>
<Heading fontWeight={600} fontSize={20} >
  Item Details
</Heading>
<VStack bg="white" shadow={1} py={3} px={2}  space={3} divider={<Divider />} w="100%">
  <HStack justifyContent="space-between">
    <Text fontWeight={600} >Sr. No</Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_name</Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_code </Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Item_Loc </Text>
    <Divider orientation="vertical" />
    <Text  fontWeight={600}>Add</Text>
  </HStack>
  <ScrollView  w="100%" h={150} nestedScrollEnabled>
  {
    itemdetails.map((item)=>(
      <HStack key={item.id} px={1} py={2} justifyContent="space-between">
      <Text>{item.id+1}</Text>
        <Text>{item.itemname}</Text>
        <Text>{item.itemcode} </Text>
        <Text>{item.itemloc} </Text>
        <Text>+</Text>
      </HStack>
    ))
  }

  </ScrollView> 
</VStack>
</VStack>
<Center>
        <Divider  w="90%" orientation='horizontal' />
        <TextArea mt={5} h={170} fontSize={19} bg="white" placeholder='Add Description If Any'  w="90%" />
        <Button
        my={7}
          onPress={()=>console.log(false)} rounded={5} bg="#3C5AC8" w="40%" h={12} 
                   _pressed={{
            bg:"#0004",
          }} >
            <Text color='white' fontSize={17} >Save</Text>
            </Button>
        </Center>
        

     
</Box>
</ScrollView>

  <Footer/>
  </Box>
  )
}

export default RecVender

