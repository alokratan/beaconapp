
import { Box,Modal,Alert, HStack,Divider,ScrollView,Pressable, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React,{useState,useCallback} from 'react'
import Header from '../Header'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import Footer from '../../Components/Footer'
import {ToastAndroid } from 'react-native';
import itemdetails from '../../Itemdetails'
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
const RecVender = ({navigation}) => {
  const [openqr,setOpenqr]=useState(false);
  const [openqr2,setOpenqr2]=useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanned2, setScanned2] = useState(false);
  const [itemdata,setItemdata]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorshow, setErrorshow] = useState(false);
  const [DESC_REC_TV, setDESC_REC_TV] = useState("");

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


    
    const apicall= async (data)=>{
      try{
        const result=await axios.get(`https://ourphonemd.com/ords/consultit/QRCODE/ITEM/${data}`);  
        console.log("res",result.data);
        if(result.data.count==0){
          setScanned(false);
          ToastAndroid.show('Item Not Found', 1000)
          setIsLoading(false);
        }
        else{
              setScanned(true);
          console.log(result.data.items[0]);
    
          setItemdata(result.data.items[0]);

         setIsLoading(false);
        }
        
      }
      catch(err){
          console.log(err)
      }
   
  }
    const apicall2= async (datas)=>{
      setIsLoading(true);
        try {
          const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/DATA/${itemdata.qr_id}`,
           {     P_QR_LOCATION:datas
           });
          console.log("heading4",response.data);
          apicall(itemdata.p_item_code);
          ToastAndroid.show('Location Updated Successfully...', 1000)

        // Handle the response data
          setIsLoading(false);
        } catch (error) {
          console.error("heading4",error); // Handle the error
        }
  }

  const onputdata=async()=>{
    
    setIsLoading(true);
if(DESC_REC_TV.trim() ){

try {
  const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/UPDATE/DESC_REC_TV/${itemdata.qr_id}`,
   {   
    DESC_RECEIVED_VENDOR:DESC_REC_TV
   });
  console.log("heading4",response.data);
  ToastAndroid.show('Issued Successfully...', 1000)

// Handle the response data
  setIsLoading(false);
  // setDESC_REC_TV("");  

} catch (error) {
  console.error("heading4",error); // Handle the error
}
}
else{
setIsLoading(false);
alert('All fields are required...')
}
   
  }
  function Modalcamfun(){
    onscanbutton();
    const handleBarCodeScanned = ({data }) => {
      setOpenqr(false);
      console.log(data)
      if(data[0]!=="I"){
        setScanned(false);
        setErrorshow(true)
      }
      else{
        setIsLoading(true);
        ToastAndroid.show('Please Wait.', 1000);
        setScanned(true);
        apicall(data);
      }
    
    };
    return(
      <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>       
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width:260,height:260}}       
      />
    {scanned && <Button  _pressed={{
                bg:"grey",
                      }} bg="white" py={5} px={5} position='absolute' top='40%' onPress={() => setScanned(false)} >
       <Text fontWeight="500" fontSize={18}> Tap to Scan Again
        </Text>
        </Button>
        }
        </Box>
    )
  } 
  function Modalcamfun2(){
    onscanbutton();
    const handleBarCodeScanned2 = ({data }) => {
      setOpenqr2(false);
      console.log(data)
        setIsLoading(true);
        ToastAndroid.show('Please Wait.', 1000);
        setScanned2(true);
        apicall2(data);
    };
    return(
      <Box bg="white" justifyContent="center" alignItems="center" h={300} w={300}>       
      <BarCodeScanner
        onBarCodeScanned={scanned2 ? undefined : handleBarCodeScanned2}
        style={{width:260,height:260}}       
      />
       {scanned2 && <Button py={2} px={5} position='absolute' top='40%' onPress={() => setScanned2(false)}>
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
       <Modal isOpen={openqr2} onClose={()=>setOpenqr2(false)} >
        <Modalcamfun2/>
        </Modal>
        <Modal isOpen={errorshow} onClose={()=>setErrorshow(false)} > 
        <Alert   bg="white" status="error" >
          <VStack my={6} mx={10} space={2} alignItems="center" >
          <Alert.Icon size={6} />
          <Text fontWeight="800" fontSize={20}>Invalid Data</Text>
          
          </VStack>

        </Alert>
        
        </Modal>
    <Header goback={()=>navigation.goBack()} title="Received From Vendor"/>
   <ScrollView   nestedScrollEnabled>
    <Box flex={1} >   
    <VStack mx={5} my={10}  space={5}>
{/* <Heading fontWeight={600} fontSize={20} >
  Recieving
</Heading> */}
<HStack justifyContent="space-between" w="full" rounded={5} px={5} bg="white" py={4}>
{
  scanned?
  <Text fontSize={18}>
Scan Again
</Text>:
<Text fontSize={18}>
Scan Item
</Text>

}
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
onPress={()=>setOpenqr2(true)}
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
   
  </HStack>
  <ScrollView  w="100%" h={10} nestedScrollEnabled>
  {
    scanned?
       <HStack key={itemdata.qr_id} px={1} py={2} justifyContent="space-between">
      <Text>{itemdata.qr_id}</Text>
        <Text>{itemdata.p_item}</Text>
        <Text>{itemdata.p_item_code} </Text>
        <Text>{itemdata.p_qr_location} </Text>
       
      </HStack>
    // ))
    :
   
      <HStack  px={1} py={2} justifyContent="space-between">
      <Text>-</Text>
        <Text>-</Text>
        <Text>-</Text>
        <Text>-</Text>
      
      </HStack>
   
  }

  </ScrollView> 
</VStack>
</VStack>
<Center>
        <Divider  w="90%" orientation='horizontal' />
        <TextArea value={DESC_REC_TV} onChangeText={(e)=>setDESC_REC_TV(e)} mt={5} h={170} fontSize={19} bg="white" placeholder='Add Description If Any'  w="90%" />
        <Button
        my={7}
          onPress={onputdata} rounded={5} bg="#3C5AC8" w="40%" h={12} 
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

