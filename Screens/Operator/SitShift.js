
import { Box,Input,Modal,Alert,Spinner,Pressable, HStack,Divider,ScrollView, Heading, Text, VStack, Center, TextArea, Button } from 'native-base'
import React,{useState,useCallback} from 'react'
import Header from '../Header'
import axios  from 'axios'
import itemdetails from '../../Itemdetails'
import Footer from '../../Components/Footer'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useFocusEffect } from '@react-navigation/native';
import {ToastAndroid } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SitShift = ({navigation}) => {
  const [openqr,setOpenqr]=useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [itemdata,setItemdata]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorshow, setErrorshow] = useState(false);
  const [NEWSITE, setNEWSITE] = useState("");
  const [WAREHOUSENAME, setWAREHOUSENAME] = useState("");
  const [SS_DESCRIPTION, setSS_DESCRIPTION] = useState("");


  
  
  useFocusEffect(
    useCallback(
      ()=>{
       ( async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        
        } )(); 
      }
    )
  );
  
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

  
  const onputdata=async()=>{
    
    setIsLoading(true);
if(NEWSITE.trim() || WAREHOUSENAME.trim() || SS_DESCRIPTION.trim()){

try {
  const response = await axios.put(`https://ourphonemd.com/ords/consultit/QRCODE/QUALITYPASS/${itemdata.qr_id}`,
   {   
   
    NEWSITE,
    WAREHOUSENAME,
    SS_DESCRIPTION,
   });
  console.log("200 SUCCESS",response.data);
  apicall(itemdata.p_item_code);
  ToastAndroid.show('Issued Successfully...', 1000)

// Handle the response data
  setIsLoading(false);  
  setNEWSITE('');
  setWAREHOUSENAME('');
  setSS_DESCRIPTION('');
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
      const handleBarCodeScanned = async ({data }) => {  
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
        }}
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
  
    
    setTimeout(() => {
      setErrorshow(false)
    }, 2000);


  return (
    <Box flex={1}  justifyContent="space-between" bg="#E7F0FB">
    <Modal isOpen={openqr} onClose={()=>setOpenqr(false)} >
        <Modalcamfun/>
        </Modal>
        <Modal isOpen={isLoading} > 
        <Box w={12}h={12} rounded={50} justifyContent="center" bg="white" >
        <Spinner size={30} color="black"/>
        </Box>
        </Modal>
        <Modal isOpen={errorshow} onClose={()=>setErrorshow(false)} > 
        <Alert bg="white" status="error" >
          <VStack my={6} mx={10} space={2} alignItems="center" >
          <Alert.Icon size={6} />
          <Text fontWeight="800" fontSize={20}>Invalid Data</Text>
          
          </VStack>

        </Alert>
        
        </Modal>
   
   
    <Header goback={()=>navigation.goBack()} title="Enter Site Shifting"/>
   <ScrollView   nestedScrollEnabled>
    <Box flex={1} >   
    <VStack mx={5} my={10}  space={5}>
{/* <Heading fontWeight={600} fontSize={20} >
Site shifting Details
</Heading> */}


<Pressable
bg="white"
rounded={5}
_pressed={
  {
    bg: '#0001'
  }
}
onPress={()=>setOpenqr(true)}>

            <HStack justifyContent="space-between" w="full"  px={5}  py={4}>
            {
  scanned?
  <Text fontSize={18}>
Scan Again
</Text>:
<Text fontSize={18}>
Scan Item
</Text>

}
                <MaterialIcons name="qr-code-scanner" size={24} color="black" />         
            </HStack>
            </Pressable>
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
    // <HStack  px={1} py={2} justifyContent="space-between">
    // <Text>id</Text>
    //   <Text>item iengif</Text>
    //   <Text>item codewgowee </Text>
    //   <Text>locatiejwgojowjon </Text>
    //   <Text>Pass</Text>
    // </HStack>
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
<VStack space={5}>
<Input value={NEWSITE} onChangeText={(e)=>setNEWSITE(e)} placeholder="New site name" fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4} />
<Input value={WAREHOUSENAME} onChangeText={(e)=>setWAREHOUSENAME(e)} placeholder=" Warehouse name" fontSize={18}  w="full" rounded={5} pl={5} bg="white" py={4} />


</VStack>
</VStack>
<Center>
        <Divider  w="90%" orientation='horizontal' />
        <TextArea value={SS_DESCRIPTION} onChangeText={(e)=>setSS_DESCRIPTION(e)}  mt={5} h={170} fontSize={19} bg="white" placeholder='Add Description If Any'  w="90%" />
        <Button
        my={7}
        onPress={ scanned? onputdata: console.log('nothing')}
         rounded={5} bg="#3C5AC8" w="40%" h={12} 
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

export default SitShift

